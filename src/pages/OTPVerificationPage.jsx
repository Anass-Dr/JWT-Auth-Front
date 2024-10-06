import {useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "@/context/AuthContext.jsx";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {toast} from "sonner";
import validate from "@/utils/inputValidate.js";

export default function OTPVerificationPage() {
    const [otpMethod, setOtpMethod] = useState('email');
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        handleResend();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const otp = inputRef.current.value;
            await validate({otp}, ['otp']);
            const result = await Auth.verifyOTP(otp);
            if (result) navigate('/');
        } catch (error) {
            return toast(error.message);
        }
    }

    const handleResend = async () => {
        try {
            const result = await Auth.sendOTP(otpMethod);
            if (!result) navigate('/signin');
        } catch (error) {
            toast(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">OTP Verification</h1>
                    <p className="text-gray-500">Enter the OTP sent to your {otpMethod}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 flex items-center flex-col">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <InputOTP ref={inputRef} maxLength={4} required>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <RadioGroup defaultValue="email" onValueChange={setOtpMethod}
                                className="flex justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email"/>
                            <Label htmlFor="email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sms" id="sms"/>
                            <Label htmlFor="sms">SMS</Label>
                        </div>
                    </RadioGroup>
                    <Button type="submit" className="w-full">Verify OTP</Button>
                </form>
                <div className="text-center">
                    <Button variant="link" onClick={handleResend}>
                        Resend OTP
                    </Button>
                </div>
            </div>
        </div>
    )
}
import {useState, useRef, useContext, useEffect} from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import {AuthContext} from "@/context/AuthContext.jsx"
import {toast} from "sonner"
import validate from "@/utils/inputValidate"
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Progress} from "@/components/ui/progress.jsx";

export default function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const passRef = useRef(null)
    const confirmPassRef = useRef(null)
    const Auth = useContext(AuthContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            toast('Invalid reset link');
            navigate('/forgot-password');
        }
        const verifyResetToken = async () => {
            setIsLoading(true);
            const result = await Auth.verifyResetToken(token);
            if (!result) navigate('/forgot-password');
            setIsLoading(false);
        }
        verifyResetToken();
    }, [])

    const checkPasswordStrength = (pass) => {
        let strength = 0
        if (pass.length > 8) strength += 20
        if (pass.match(/[a-z]+/)) strength += 20
        if (pass.match(/[A-Z]+/)) strength += 20
        if (pass.match(/[0-9]+/)) strength += 20
        if (pass.match(/[$@#&!]+/)) strength += 20
        setPasswordStrength(strength)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = passRef.current.value;
        const confirmPassword = confirmPassRef.current.value;
        try {
            await validate({password, confirmPassword}, ['password', 'confirmPassword']);
            const result = await Auth.resetPassword(password);
            if (result) navigate('/signin');
        } catch (error) {
            toast(error.message);
        }
    }

    if (isLoading) return;
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-gray-500">Please enter your new password below</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            ref={passRef}
                            id="password"
                            type="password"
                            required
                            onChange={(e) => checkPasswordStrength(e.target.value)}
                        />
                        <Progress value={passwordStrength} className="h-2"/>
                        <p className="text-sm text-gray-500">Password strength: {passwordStrength}%</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            ref={confirmPassRef}
                            id="confirm-password"
                            type="password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Reset password</Button>
                </form>
            </div>
        </div>
    )
}
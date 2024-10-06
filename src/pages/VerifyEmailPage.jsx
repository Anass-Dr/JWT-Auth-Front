import {useState, useEffect, useContext, useRef} from "react";
import {useSearchParams, useNavigate } from "react-router-dom";
import {AuthContext} from "@/context/AuthContext";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input.jsx";
import validate from "@/utils/inputValidate.js";

export default function VerifyEmailPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const Auth = useContext(AuthContext);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) return;
            setIsLoading(true);
            const isVerified = await Auth.verifyEmail(token);
            if (isVerified) navigate('/signin');
            setSearchParams({});
            setIsLoading(false);
        }
        verifyEmail();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = inputRef.current.value;
            await validate({email}, ['email']);
            await Auth.resendVerificationEmail(email);
        } catch (error) {
            console.error(error.message);
        }
    }

    if (isLoading) return;
    return (
        <div
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                {isResending ?
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 mb-4">Email Address</h2>
                            <Input
                                ref={inputRef}
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="mt-8 space-y-6">
                            <Button
                                className="w-full flex items-center justify-center"
                            >
                            <span className="flex items-center">
                                Send Verification Email
                            </span>
                            </Button>
                        </div>
                    </form>
                    :
                    <>
                        <div>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Not Verified</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Email verification expired or invalid. Please click the button below to resend the
                                verification
                            </p>
                        </div>
                        <div className="mt-8 space-y-6">
                            <Button
                                onClick={() => setIsResending(true)}
                                className="w-full flex items-center justify-center"
                            >
                            <span className="flex items-center">
                                Resend Verification Email
                            </span>
                            </Button>
                        </div>
                    </>
                }

            </div>
        </div>
    );
}
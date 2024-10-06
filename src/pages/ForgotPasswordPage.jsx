import { useContext, useRef } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {NavLink} from "react-router-dom";

export default function ForgotPasswordPage() {
    const Auth = useContext(AuthContext);
    const emailRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        await Auth.sendResetLink(email);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Forgot Password</h1>
                    <p className="text-gray-500">Enter your email address and we'll send you a link to reset your
                        password.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            ref={emailRef}
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Send reset link</Button>
                </form>
                <div className="text-center">
                    <NavLink to="/signin"
                             className="font-medium text-primary hover:text-primary/90 transition-colors">
                        Back to sign in
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
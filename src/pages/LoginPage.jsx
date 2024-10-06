import { useState, useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";

export default function LoginPage() {
    const [user, setUser] = useState({email: '', password: ''})
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await Auth.login(user);
        if (result.success) navigate('/');
        else if (result.error === 'UNAUTHORIZED_DEVICE') navigate('/otp-verification');
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                onChange={handleChange}
                                value={user.email}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={user.password}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-2 mt-4">
                            <div className="flex items-center">
                                <Checkbox id="remember-me"/>
                                <Label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </Label>
                            </div>

                            <div className="text-sm">
                                <NavLink to="/forgot-password"
                                   className="font-medium text-primary hover:text-primary/90 transition-colors">
                                    Forgot your password?
                                </NavLink>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <Button className="w-full">Sign in</Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-500">
                        Don't have an account? <NavLink to="/signup" className="text-blue-500 hover:underline">Sign up</NavLink>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
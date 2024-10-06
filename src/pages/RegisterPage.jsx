import { useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "@/context/AuthContext.jsx"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Progress} from "@/components/ui/progress"
import { toast } from "sonner"
import validate from "@/utils/inputValidate"


export default function RegisterPage() {
    const [user, setUser] = useState({username: '', email: '', password: '', phone: '', address: ''})
    const [passwordStrength, setPasswordStrength] = useState(0)
    const Auth = useContext(AuthContext);

    const checkPasswordStrength = (pass) => {
        let strength = 0
        if (pass.length > 8) strength += 20
        if (pass.match(/[a-z]+/)) strength += 20
        if (pass.match(/[A-Z]+/)) strength += 20
        if (pass.match(/[0-9]+/)) strength += 20
        if (pass.match(/[$@#&!]+/)) strength += 20
        setPasswordStrength(strength)
        setUser({...user, password: pass})
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validate(user, ['username', 'email', 'password', 'phone', 'address']);
            const phone = "+212" + user.phone.substring(1);
            const userData = {...user, phone};
            if (await Auth.register(userData)) setUser({username: '', email: '', password: '', phone: '', address: ''});
        } catch (error) {
            toast(error.message);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your details to register</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="John Doe" onChange={handleChange} value={user.username} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" onChange={handleChange} value={user.email} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                onChange={(e) => checkPasswordStrength(e.target.value)}
                                value={user.password}
                            />
                            <Progress value={passwordStrength} className="h-2"/>
                            <p className="text-sm text-gray-500">Password strength: {passwordStrength}%</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="text" onChange={handleChange} required value={user.phone} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" type="text" onChange={handleChange} required value={user.address} />
                        </div>
                        <div className="mt-4 space-y-2">
                            <Button className="w-full">Register</Button>
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
                        Already have an account? <NavLink to="/signin" className="text-blue-500 hover:underline">Sign in</NavLink>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
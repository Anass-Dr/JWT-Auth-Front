import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LogoutPage() {
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            await Auth.logout();
            navigate('/signin');
        };
        logout();
    }, []);

    return null;
}
import { useContext, createContext, useState, Component } from 'react';
import { LoaderContext } from './LoaderContext';
import axiosInstance from '../config/axios.js';
import {toast} from "sonner";

class Auth {
    constructor(user, setUser, setLoading) {
        this.user = user;
        this.setUser = setUser;
        this.setLoading = setLoading;
    }

    async register (userData) {
        try {
            this.setLoading(true);
            const response = await axiosInstance.post('auth/register', userData);
            const data = await response.data;
            this.setLoading(false);
            toast(data.message);
            return true;
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.message);
            return false;
        }
    }

    async login (userData) {
        this.setUser({email: userData.email});
        localStorage.setItem('user', JSON.stringify(userData));
        try {
            this.setLoading(true);
            const response = await axiosInstance.post('auth/login', userData);
            const data = await response.data;
            localStorage.setItem('ticket', data.accessToken);
            this.setLoading(false);
            return {success: true};
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.message);
            return {success: false, error: error.response.data.errorCode};
        }
    }

    async logout () {
        try {
            localStorage.removeItem('ticket');
            localStorage.removeItem('user');
            this.setUser(null);
            await axiosInstance.get('auth/logout');
        } catch (error) {
            console.error(error.response.data.error);
        }
    }

    async verifyEmail (token) {
        try {
            const response = await axiosInstance.get(`auth/verify?token=${token}`);
            const data = await response.data;
            toast(data.message);
            return true;
        } catch (error) {
            toast(error.response.data.error);
            return false;
        }
    }

    async resendVerificationEmail (email) {
        try {
            this.setLoading(true);
            const response = await axiosInstance.post('auth/send-email-verification', {email});
            const data = await response.data;
            this.setLoading(false);
            toast(data.message);
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.error);
        }
    }

    async sendOTP (otpMethod) {
        if (!this.user) return false;
        try {
            this.setLoading(true);
            const response = await axiosInstance.post('auth/otp-method', {email: this.user.email, method: otpMethod});
            const data = await response.data;
            this.setLoading(false);
            toast(data.message);
            return true;
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.error);
            return false;
        }
    }

    async verifyOTP (otp) {
        try {
            this.setLoading(true);
            const response = await axiosInstance.post('auth/verify-otp', {otp});
            this.setLoading(false);
            return true;
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.error);
            return false;
        }
    }

    async sendResetLink (email) {
        try {
            this.setLoading(true);
            const response = await axiosInstance.post('auth/forgot-password', {email});
            const data = await response.data;
            this.setLoading(false);
            toast(data.message);
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.error);
        }
    }

    async verifyResetToken (token) {
        try {
            const response = await axiosInstance.get(`auth/reset-password/verify?token=${token}`);
            const data = await response.data;
            localStorage.setItem('resetToken', data.token);
            return true;
        } catch (error) {
            toast("Invalid reset link");
            return false;
        }
    }

    async resetPassword (password) {
        const resetToken = localStorage.getItem('resetToken');
        try {
            this.setLoading(true);
            const response = await axiosInstance.post(`auth/reset-password/${resetToken}`, {password});
            const data = await response.data;
            localStorage.removeItem('resetToken');
            this.setLoading(false);
            toast(data.message);
            return true;
        } catch (error) {
            this.setLoading(false);
            toast(error.response.data.error);
            return false;
        }
    }
}

export const AuthContext = createContext(null);
export default ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const {setLoading} = useContext(LoaderContext);
    const auth = new Auth(user, setUser, setLoading);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}
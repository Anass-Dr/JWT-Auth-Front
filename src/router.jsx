import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LazyWrapper = ({ Component }) => (
    <Suspense>
        <Component />
    </Suspense>
);
const Register = lazy(() => import('./pages/RegisterPage.jsx'));
const Login = lazy(() => import('./pages/LoginPage.jsx'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmailPage.jsx'));
const OTPVerification = lazy(() => import('./pages/OTPVerificationPage.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPasswordPage.jsx'));
const ResetPassword = lazy(() => import('./pages/ResetPasswordPage.jsx'));
const Logout = lazy(() => import('./pages/LogoutPage.jsx'));

const router = createBrowserRouter([
    {
        path: '/signup',
        element: <LazyWrapper Component={Register} />,
    },
    {
        path: '/signin',
        element: <LazyWrapper Component={Login} />,
    },
    {
        path: '/verify',
        element: <LazyWrapper Component={VerifyEmail} />,
    },
    {
        path: '/otp-verification',
        element: <LazyWrapper Component={OTPVerification} />,
    },
    {
        path: '/forgot-password',
        element: <LazyWrapper Component={ForgotPassword} />,
    },
    {
        path: '/reset-password',
        element: <LazyWrapper Component={ResetPassword} />,
    },
    {
        path: '/logout',
        element: <LazyWrapper Component={Logout} />,
    }
]);

export default router;
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Register = lazy(() => import('./pages/RegisterPage.jsx'));
const LazyWrapper = ({ Component }) => (
    <Suspense>
        <Component />
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: '/register',
        element: <LazyWrapper Component={Register} />,
    },
]);

export default router;
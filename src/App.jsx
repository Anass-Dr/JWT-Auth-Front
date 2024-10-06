import Loader from './components/Loader.jsx'
import {LoaderProvider} from './context/LoaderContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import {Toaster} from "@/components/ui/sonner"
import { RouterProvider } from 'react-router-dom';
import Router from './router.jsx'

function App() {
    return (
        <>
            <LoaderProvider>
                <AuthProvider>
                    <RouterProvider router={Router} />
                </AuthProvider>
                <Loader/>
            </LoaderProvider>
            <Toaster/>
        </>
    )
}

export default App

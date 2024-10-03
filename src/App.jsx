import Loader from './components/Loader.jsx'
import {LoaderProvider} from './context/LoaderContext.jsx'
import {Toaster} from "@/components/ui/sonner"
import { RouterProvider } from 'react-router-dom';
import Router from './router.jsx'

function App() {
    return (
        <>
            <LoaderProvider>
                <RouterProvider router={Router} />
                <Loader/>
            </LoaderProvider>
            <Toaster/>
        </>
    )
}

export default App

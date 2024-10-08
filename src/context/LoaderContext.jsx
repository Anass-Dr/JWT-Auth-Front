import { createContext, useState } from 'react';

export const LoaderContext = createContext(false);

export function LoaderProvider({ children }) {
    const [loading, setLoading] = useState(false);
    return (
        <LoaderContext.Provider value={{loading, setLoading}}>
            {children}
        </LoaderContext.Provider>
    );
}
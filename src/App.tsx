import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { AuthState } from "@/shared/services/authService"
import { useEffect } from 'react'
import { LoginPage } from "./components/LoginPage"
import { SecurePage } from "./components/SecurePage"

import { Toaster } from "sonner"

function App() {
    const [authState, setAuthState] = useState<AuthState>({
        isLoggedIn: false,
        user: null,
        auth: null,
        isInitialized: false
    })

    const handleAuthStateChange = useCallback((newAuthState: AuthState) => {
        setAuthState(newAuthState)
    }, [])

    useEffect(() => {
        document.title = "Simple Template"
    }, [])      

    return (
        <>
        {!authState.isInitialized || !authState.isLoggedIn ? (
            <LoginPage onAuthStateChange={handleAuthStateChange} />
        ) : (
            <SecurePage onAuthStateChange={handleAuthStateChange} />
        )}
        <Toaster 
            position="top-right"
            toastOptions={{
            style: { background: 'white' },
            className: 'class',
            }}
        />
        </>
    )
}

export default App
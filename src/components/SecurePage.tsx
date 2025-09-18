import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { authService, AuthState } from '@/shared/services/authService'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Loader2 } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { toast } from 'sonner'

interface SecurePageProps {
    onAuthStateChange: (authState: AuthState) => void
}

export function SecurePage({ onAuthStateChange }: SecurePageProps) {

    const handleSignOut = async () => {
        try {
            const auth = authService.getAuth()
            if (auth) {
                
                await signOut(auth)
                    toast.success('Signed out successfully', {
                    description: 'You have been logged out. See you next time!'
                })

                // Update the auth state to redirect to login page
                onAuthStateChange({
                    isLoggedIn: false,
                    user: null,
                    auth: null,
                    isInitialized: true
                })
            }
        } catch (error) {
            console.error('Sign out error:', error)
            toast.error('Failed to sign out', {
                description: 'Please try again or refresh the page.'
            })
        }
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
        <Button onClick={handleSignOut}>Sign out</Button>
        </div>
    )    
}
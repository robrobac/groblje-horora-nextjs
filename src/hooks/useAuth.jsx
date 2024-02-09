import { auth } from "@/lib/firebase/config"
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export default function useAuth() {
    const [user, loading, error] = useAuthState(auth)
    const [mongoUser, setMongoUser] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
            const getMongoUser = async () => {
                if (user) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/${user.email}`)
                    const json = await response.json()

                    if (!response.ok) {
                        console.log('error fetching mongo user, trying again...', json)
                        return
                    }
                    setMongoUser(json)
                } else {
                    setMongoUser(null)
                }
            }

            getMongoUser();

    }, [user])

    return {
        user,
        mongoUser
    }
}

export const logout = async () => {
    try {
        // Sign out the user using Firebase authentication
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }
};

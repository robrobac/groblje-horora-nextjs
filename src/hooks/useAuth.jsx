import { auth } from "@/lib/firebase/config"
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export default function useAuth() {
    const [user, loading, error] = useAuthState(auth)
    const [mongoUser, setMongoUser] = useState(null)

    useEffect(() => {
            const getMongoUser = async () => {
                if (user?.email) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/${user.email}`, {
                        method: 'GET'
                    })
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

    }, [user, error])

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

import { auth } from "@/lib/firebase/config"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export default function useAuth() {
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [mongoUser, setMongoUser] = useState(null)
    console.log(mongoUser)
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    const logout = async () => {
        try {
            // Sign out the user using Firebase authentication
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setIsLoadingUser(true)
            if (user) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/${user.email}`)
                    const json = await response.json()

                    if (!response.ok) {
                        console.log('error fetching mongo user', json)
                        return
                    }
                    setFirebaseUser(user)
                    setMongoUser(json)

                } catch (err) {
                    console.log(err)
                    setFirebaseUser(null)
                    setMongoUser(null)
                } finally {
                    setIsLoadingUser(false)
                }
            } else {
                setFirebaseUser(null)
                setMongoUser(null)
                setIsLoadingUser(false)
            }
        })

        return () => {
            unsubscribe();
        };
    }, [])

    return {
        firebaseUser,
        mongoUser,
        isLoadingUser,
        logout
    }
}
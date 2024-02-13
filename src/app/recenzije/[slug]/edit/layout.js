'use client'
import { UnauthorizedRedirect } from "@/components/admin/UnauthorisedRedirect";
import GhostSpinner from "@/components/ghostSpinner/GhostSpinner"
import useAuth from "@/hooks/useAuth"

export default function EditPostLayout({ children }) {
    const { user, mongoUser } = useAuth()


    return (
        <>
            {mongoUser && user ? (
                <>
                    {mongoUser.role === "admin" ? (
                        <>{children}</>
                    ) : (
                        <div style={{ height: '80vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <UnauthorizedRedirect />
                        </div>
                    )}
                </>
            ) : (
                <div style={{ height: '80vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GhostSpinner size={'50px'} />
                </div>
            )}
        </>
    )
}
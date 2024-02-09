"use client"
import styles from '@/app/(auth)/auth.module.scss';
import { LoadingBtn } from '@/components/buttons/loadingBtn';
import { Logo } from '@/components/header/svg/Logo';
import { auth } from '@/lib/firebase/config';
import background from '../../../../public/images/groblje-horora-bg-image.jpg';
import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth, { logout } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import GhostSpinner from '@/components/ghostSpinner/GhostSpinner';


const PrijavaPage = ({searchParams}) => {
    const router = useRouter();

    const { firebaseUser } = useAuth()

    const [loggingIn, setLoggingIn] = useState(false)

    const [email, setEmail] = useState(searchParams.email || '')
    const [password, setPassword] = useState('')
    
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [forgotPassword, setForgotPassword] = useState(false)

    const [emailVerified, setEmailVerified] = useState(true)
    const [verficationAuthData, setVerificationAuthData] = useState(null)
    const [sendingVerification, setSendingVerification] = useState(false)

    useEffect(() => {
        if (auth.currentUser?.emailVerified === false) {
            setVerificationAuthData(auth.currentUser)
            setError('Potvrdi email prije prijave')
            setEmailVerified(false)
            logout()
        }
    }, [])

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Login Form Submitted')
        setLoggingIn(true)
        setError('')
        setSuccess('')
        setEmailVerified(true)
        try {
            // Sign in with email and password using Firebase
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log('Firebase User Signed In', user.user);

            console.log('Login Successful')

            if (auth.currentUser?.emailVerified === false) {
                setVerificationAuthData(auth.currentUser)
                setError('Potvrdi email prije prijave')
                setEmailVerified(false)
                logout()
                return
            }

            const backURL = sessionStorage.getItem('lastVisitedUrl');
            if (backURL) {
                sessionStorage.removeItem('lastVisitedUrl');
                console.log('Navigating to last visited URL')
                router.push(backURL)
            } else {
                console.log('Navigating to Home page')
                router.push('/')
            }
            setEmail('')
            setPassword('')

        } catch (err) {
            console.log(err.message)
            setError('Neispravan email ili lozinka')
            
        } finally {
            setLoggingIn(false)
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setLoggingIn(true)
        setError('')
        setSuccess('')
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/${email}`)
            const json = await response.json()

            if (!response.ok) {
                setError('Email nije registriran')
                return
            }

            sendPasswordResetEmail(auth, email)
            setSuccess(`Email za oporavak lozinke poslan na ${email}`)

            
        } catch (err) {
            console.log(err)

        } finally {
            setLoggingIn(false)
        }
    }

    const handleSwitch = (val) => {
        setForgotPassword(val)
        setError('')
        setPassword('')
    }

    // const handleResendVerification = async () => {
    //     setSendingVerification(true)
    //     console.log(verficationAuthData)
    //     await sendEmailVerification(verficationAuthData);
    //     console.log('verification email sent')
    //     setSendingVerification(false)
    //     setSuccess('Email za potvrdu poslan')
    //     setError('')
    // }

    const handleResendVerification = async () => {
        setSendingVerification(true);
        console.log(verficationAuthData);
        setSuccess('');
        setError('')
        try {
            await sendEmailVerification(verficationAuthData);
            console.log('verification email sent');
            setSuccess('Email za potvrdu poslan');
            setError('');
        } catch (error) {
            console.error('Error sending verification email:', error);
            setError('Potvrda je nedavno poslana, pričekajte minutu i pokušajte ponovo');
        } finally {
            setSendingVerification(false);
        }
    }


    return (
        <main className="authContainer">
            <div className={styles.authPage} style={{backgroundImage: `url(${background.src})`}}>
                <Link href={'/'} >
                    <Logo />
                </Link>
                {!forgotPassword ? (
                    <div className={styles.authContainer}>
                        <h3>PRIJAVA</h3>
                        {error ? (
                            <>
                                {sendingVerification && <GhostSpinner size={'16px'}/>}
                                <p className={styles.error}>{error}</p>
                            </>
                        ) : (
                            <>
                                {sendingVerification && <GhostSpinner size={'16px'}/>}
                                <p className={`${styles.error} ${styles.success}`}>{success}</p>
                            </>
                        )}
                        {!emailVerified && (
                            <p style={{color: '#ffffff60'}}>Niste dobili email s potvrdom? <span onClick={() => handleResendVerification()}>Pošalji ponovo</span></p>
                        )}
                        <form className={styles.authForm} onSubmit={handleLogin}>
                            <div className='inputContainer'>
                                <label className='inputLabel' htmlFor='email'>Email</label>
                                <input className='inputField' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={firebaseUser && true}/>
                            </div>
                            <div className='inputContainer'>
                                <label className='inputLabel' htmlFor='password'>Password</label>
                                <input className='inputField' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={firebaseUser && true}/>
                            </div>
                            <LoadingBtn loading={loggingIn} content="Pošalji" type={loggingIn ? 'button' : 'submit'} size={'20px'}/>
                        </form>
                        {/* <p className={styles.separator}>google uskoro</p>
                        <button className={styles.googleLoginButton} type="button" disabled>
                            <GoogleIcon /> Sign in with Google
                        </button> */}
                        <p onClick={() => handleSwitch(true)}><span>Zaboravili ste lozinku?</span></p>
                        <p>Nemaš korisnički račun? <Link href='/registracija'>Registriraj se</Link></p>
                        
                    </div>
                ) : (
                    <div className={styles.authContainer}>
                        <h3>ZABORAVLJENA LOZINKA</h3>
                        <p className={styles.error}>{error}</p>
                        <p className={`${styles.error} ${styles.success}`}>{success}</p>
                        <form className={styles.authForm} onSubmit={handleForgotPassword}>
                            <div className='inputContainer'>
                                <label className='inputLabel' htmlFor='email'>Email</label>
                                <input className='inputField' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <LoadingBtn loading={loggingIn} content="Pošalji" type={loggingIn ? 'button' : 'submit'} size={'20px'}/>
                            
                        </form>
                        <p onClick={() => handleSwitch(false)}>Ipak znaš lozinku? <span>Povratak na prijavu</span></p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default PrijavaPage;

"use client"
import styles from '@/app/(auth)/auth.module.scss';
import { LoadingBtn } from '@/components/buttons/loadingBtn';
import { Logo } from '@/components/header/svg/Logo';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';
import background from '../../../../public/images/groblje-horora-bg-image.jpg';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';


const RegistracijaPage = () => {

    const router = useRouter();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState([])

    const [creatingUser, setCreatingUser] = useState(false)

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log('Register Form Submitted') // Keep in Development

        const formattedEmail = email.replace(/\s/g, '').trim()
        // setEmail(formattedEmail)
        const formattedUsername = username.replace(/\s/g, '')
        // setUsername(formattedUsername)
        const formattedPassword = password.replace(/\s/g, '')
        setPassword(formattedPassword)
        // console.log(formattedEmail) // Keep in Development
        // console.log('strings formatted, no empty spaces allowed.') // Keep in Development
        setCreatingUser(true)
        setErrors([])
        try {
            // Validate new user data
            const validation = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/validateNewUser`, {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const validationJson = await validation.json();
            if (!validation.ok) {
                // console.log(validationJson)
                setErrors(validationJson.errorMessages)
                return
            }

            // console.log('Validation success'); // Keep in Development

            // Create user with email and password using Firebase
            const user = await createUserWithEmailAndPassword(auth, email, password);
            // console.log('Firebase  User Created', user.user) // Keep in Development

            // Update user profile with the provided username
            await updateProfile(user.user, {
                displayName: username
            });
            // console.log('Firebase User Display Name Updated', user.user); // Keep in Development

            // Prepare user data for storing to MongoDB
            const userData = {
                username: username,
                email: email,
                role: 'user',
            };
            // console.log('User Data prepared for storing to MongoDB') // Keep in Development

            // Store user data to MongoDB
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (!response.ok) {
                setErrors(validationJson.errorMessages)
                console.log(json);
                return;
            }
            // console.log('User Data stored to MongoDB', json); // Keep in Development

            // Send email verification
            await sendEmailVerification(auth.currentUser);
            // console.log('verification email sent') // Keep in Development

            // Redirect to the previous page stored in session storage
            
            // console.log('Registration Successful') // Keep in Development

            // WILL MAYBE USE IT LATER
            // const backURL = sessionStorage.getItem('lastVisitedUrl');
            // if (backURL) {
            //     sessionStorage.removeItem('lastVisitedUrl');
            //     console.log('Navigating to last visited URL')
            //     router.push(backURL)
            // } else {
            //     setEmail('')
            //     setUsername('')
            //     setPassword('')
            //     console.log('Navigating to Login page')
            //     router.push('/prijava')
            // }

            setEmail('')
            setUsername('')
            setPassword('')
            // console.log('Navigating to Login page') // Keep in Development
            // Redirect to the login page
            router.push(`/prijava${auth.currentUser ? `?email=${auth.currentUser.email}` : ''}`)
            
        
        } catch(err) {
            console.log(err);

            // Delete user from MongoDB if Firebase Registration is unsuccessful - NOT SURE WHY I DID THIS - I THINK IT'S A MISTAKE - Gotta check
            const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/users/${email}`, {
                method: 'DELETE',
            });
            const deleteJson = await deleteResponse.json();
            if (deleteResponse.ok) {
                // console.log('User deleted from MongoDB', deleteJson); // Keep in Development
            }
        } finally {
            setCreatingUser(false)
        }
    }


    return (
        <main className="authContainer">
            <div className={styles.authPage} style={{backgroundImage: `url(${background.src})`}}>
                <Link href={'/'} >
                    <Logo />
                </Link>
                <div className={styles.authContainer}>
                    <h3>REGISTRACIJA</h3>
                    <p className={styles.error}>{errors?.join(', ')}</p>
                    <form className={styles.authForm} onSubmit={handleRegister}>
                        <div className='inputContainer'>
                            <label className='inputLabel' htmlFor='username'>Email</label>
                            <input className='inputField' id='email' name='username' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='inputContainer'>
                            <label className='inputLabel' htmlFor='displayName'>Username</label>
                            <input className='inputField' id='username' name='displayName' type='text' maxLength="15" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className='inputContainer'>
                            <label className='inputLabel' htmlFor='password'>Password</label>
                            <input className='inputField' id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <LoadingBtn loading={creatingUser} content="Registracija" type={creatingUser ? 'button' : 'submit'} size={'20px'}/>
                    </form>
                    <p>Već imate račun? <Link href='/prijava'>Prijavite se</Link></p>
                </div>
            </div>
        </main>
    );
};

export default RegistracijaPage;

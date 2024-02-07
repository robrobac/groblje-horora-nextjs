"use client"
import styles from '@/app/(auth)/auth.module.scss';
import { LoadingBtn } from '@/components/buttons/loadingBtn';
import { Logo } from '@/components/header/svg/Logo';
import GoogleIcon from '@/components/svgComponents/GoogleIcon';
import { auth } from '@/lib/firebase/config';
import Link from 'next/link';
import background from '../../../../public/images/groblje-horora-bg-image.jpg';
import { useState } from 'react';


const RegistracijaPage = () => {
    console.log(auth)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState(["dadada", "deafiuhaifdg idsaughalfd"])

    const [creatingUser, setCreatingUser] = useState(false)

    const handleRegister = async (e) => {console.log("adada")}


    return (
        <main className="authContainer">
            <div className={styles.authPage} style={{backgroundImage: `url(${background.src})`}}>
                <Link href={'/'} >
                    <Logo />
                </Link>
                <div className={styles.authContainer}>
                    <h3>REGISTRACIJA</h3>
                    <p className={styles.error}>{errors.join(', ')}</p>
                    <form className={styles.authForm} onSubmit={handleRegister}>
                        <div className='inputContainer'>
                            <label className='inputLabel' htmlFor='email'>Email</label>
                            <input className='inputField' id='email' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='inputContainer'>
                            <label className='inputLabel' htmlFor='username'>Username</label>
                            <input className='inputField' id='username' name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className='inputContainer'>
                            <label className='inputLabel' htmlFor='password'>Password</label>
                            <input className='inputField' id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <LoadingBtn clickEvent={""} loading={creatingUser} content="Registracija" type={creatingUser ? 'button' : 'submit'}/>
                    </form>
                    {/* <p className={styles.separator}>google uskoro</p>
                    <button className={styles.googleLoginButton} type="button" disabled>
                        <GoogleIcon /> Sign in with Google
                    </button> */}
                    <p>Već imate račun? <Link href='/login'>Prijavite se</Link></p>
                </div>
            </div>
        </main>
    );
};

export default RegistracijaPage;

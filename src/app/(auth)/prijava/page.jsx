"use client"
import styles from '@/app/(auth)/prijava/prijava.module.scss';
import { LoadingBtn } from '@/components/buttons/loadingBtn';
import { StandardBtn } from '@/components/buttons/standardBtn/StandardBtn';
import { auth } from '@/lib/firebase/config';
import { useEffect, useState } from 'react';


const PrijavaPage = () => {
    console.log(auth)
    const [user, setUser] = useState(null)
    console.log('user', user)
    useEffect(()=>{
        const test = async () => {
            const response = await fetch(`http://localhost:3000/api/users/test123@gmail.com`)
            const json = await response.json()
            setUser(json)
        }
        test()
    })

    return (
        <div>
            <h1>Prijava Page</h1>
            <LoadingBtn clickEvent={() => console.log("dadadada")} content="Registracija"/>
        </div>
    );
};

export default PrijavaPage;

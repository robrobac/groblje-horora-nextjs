import React, { useEffect, useState } from 'react'

export default function useCountReviews() {
    const [count, setCount] = useState({})


    useEffect(() => {
        const countReviews = async () => {
            try {
                const response = await fetch(`${process.env.DOMAIN_URL}/api/countAllReviews`);
                const json = await response.json();

                if (response.ok) {
                    setCount(json);        
                } else {
                    console.log('failed to count', json)
                }
            }
            catch (err) {
                console.log(err)
            }
        };

        countReviews();
    }, []);

    return {count}
}



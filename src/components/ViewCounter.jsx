"use client"

import { useEffect, useState } from 'react'

export default function ViewCounter({slug}) {
    const [views, setViews] = useState(0);
    console.log("valja client")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/incr`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug }),
                });
                const data = await response.json();
                console.log(data)
                setViews(data); // Set the response data to state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug]);

    if (views === 0) {
        return "... pregleda"
    } else {
        return `${views} ${views % 10 === 1 ? 'pregled' : 'pregleda'}`
    }
  
}

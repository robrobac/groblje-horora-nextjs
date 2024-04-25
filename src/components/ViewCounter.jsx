"use client"

import React, { useEffect } from 'react'

export default function ViewCounter({slug}) {
    console.log("valja client")
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/incr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
        });
      }, [slug]);
  return null
}

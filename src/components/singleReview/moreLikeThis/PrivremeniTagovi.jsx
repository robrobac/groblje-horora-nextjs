"use client"

import useAuth from '@/hooks/useAuth'
import React from 'react'


export default function PrivremeniTagovi({post}) {
    const { user, mongoUser } = useAuth()
    if (mongoUser?.role === 'admin' && user) {
        return (
            <p className='adminForNow' style={{fontSize: "12px", lineHeight: "18px", display: "block"}}>
                {[...new Set(post.movies.flatMap((movie) => movie.tags.map((tag) => tag.tagLabel)))].join(", ")}
            </p>
        )
    } else return null
    
}

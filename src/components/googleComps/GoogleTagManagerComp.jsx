"use client"
import { GoogleTagManager } from '@next/third-parties/google'
import React from 'react'


export default function GoogleTagManagerComp() {
    return <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
}

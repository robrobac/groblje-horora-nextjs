"use client"
import { GoogleAnalytics } from '@next/third-parties/google'
import React from 'react'


export default function GoogleAnalyticsComp() {
    return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
}

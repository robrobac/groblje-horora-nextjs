"use client"
import React from 'react'
import dynamic from "next/dynamic";
const GoogleAnalytics = dynamic(() => import('nextjs-google-analytics'), { ssr: false })

export default function GoogleAnalyticsComp() {
  return <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/>
}

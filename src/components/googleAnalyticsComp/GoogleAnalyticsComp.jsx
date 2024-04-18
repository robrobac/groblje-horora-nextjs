"use client"
import { GoogleAnalytics } from 'nextjs-google-analytics'
import React from 'react'


export default function GoogleAnalyticsComp() {
  return <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} async/>
}

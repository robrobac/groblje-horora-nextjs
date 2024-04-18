"use client"
import { GoogleAnalytics, event } from 'nextjs-google-analytics'
import React from 'react'


export function reportWebVitals({ id, name, label, value }) {
    event(name, {
      category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      label: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate.
    });
}


export default function GoogleAnalyticsComp() {
  return <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}/>
}

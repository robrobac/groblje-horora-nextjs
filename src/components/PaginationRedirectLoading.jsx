'use client'
import React, { useEffect, useState } from 'react'
import GhostSpinner from './ghostSpinner/GhostSpinner'
import { usePathname, useRouter } from 'next/navigation'

export default function PaginationRedirectLoading({currentPage, totalPages}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (currentPage === "0") {
      router.replace(`${pathname}?page=1`)
    } else if (currentPage > totalPages) {
      router.replace(`${pathname}?page=${totalPages}`)
    }
  }, [currentPage, pathname, router, totalPages])


  const loadingStyles = {
    zIndex: 900, 
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: "24px",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: 'var(--black)'
  }
    
  return (
    <div style={loadingStyles}>
      <p>Stranica {pathname}?page={currentPage} ne postoji, učitavam najbližu stranicu...</p>
      <GhostSpinner size={50} />
      </div>
  )
}
'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>()

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    
    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ 
        lerp: 0.1,
        duration: 1.5,
        syncTouch: true,
        autoRaf: false
      }}
    >
      {children}
    </ReactLenis>
  )
}

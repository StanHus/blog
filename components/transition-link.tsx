"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode, MouseEvent } from "react"

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  direction?: "forward" | "back"
}

export function TransitionLink({ href, children, className, direction = "forward" }: TransitionLinkProps) {
  const router = useRouter()

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      router.push(href)
      return
    }

    // Get click coordinates for the animation origin
    const x = e.clientX
    const y = e.clientY
    
    document.documentElement.style.setProperty('--x', `${x}px`)
    document.documentElement.style.setProperty('--y', `${y}px`)
    
    // Set direction for CSS animations
    document.documentElement.setAttribute('data-transition-direction', direction)

    // Start view transition with navigation
    document.startViewTransition(() => {
      router.push(href)
    })
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

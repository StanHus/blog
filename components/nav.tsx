"use client"

import { TransitionLink } from "./transition-link"

export function Nav() {
  return (
    <nav className="ml-auto text-sm font-medium space-x-6">
      <TransitionLink href="/" direction="back">Home</TransitionLink>
      <TransitionLink href="/spiky-points-of-view" direction="forward">Spiky Points of View</TransitionLink>
      <TransitionLink href="/about" direction="forward">About</TransitionLink>
    </nav>
  )
}

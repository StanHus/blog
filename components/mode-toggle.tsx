"use client"

import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "light" ? "dark" : "light"
    const direction = theme === "light" ? "forward" : "back"
    
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    // Get click coordinates for the circle reveal
    const x = e.clientX
    const y = e.clientY
    
    // Set CSS custom properties for the animation origin
    document.documentElement.style.setProperty('--x', `${x}px`)
    document.documentElement.style.setProperty('--y', `${y}px`)
    document.documentElement.setAttribute('data-transition-direction', direction)

    // Start the view transition
    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })

    await transition.ready

    // Apply circle reveal animation
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          )}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 400,
        easing: 'ease-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return (
    <button
      onClick={handleToggle}
      className="border rounded-md w-6 h-6 flex items-center justify-center">
      <span className="sr-only">Toggle mode</span>
      {theme !== "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      )}
    </button>
  )
}

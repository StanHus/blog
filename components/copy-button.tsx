"use client"

import { useState } from "react"

export function CopyButton({ text, label = "Copy Payload" }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-1 px-3 rounded border border-slate-200 dark:border-slate-700 transition-colors"
    >
      {copied ? "Copied!" : label}
    </button>
  )
}

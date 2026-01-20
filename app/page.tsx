import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

const typeColors: Record<string, string> = {
  opinion: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  essay: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  guide: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  analysis: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
}

const topicColors: Record<string, string> = {
  ai: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  leadership: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  psychology: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  strategy: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
}

const stanceColors: Record<string, string> = {
  observational: "bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400",
  contrarian: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  debatable: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
}

export default function Home() {
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return (
    <div className="prose dark:prose-invert">
      {sortedPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          <div className="flex gap-1.5 mt-[-0.5rem] mb-2 not-prose">
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${typeColors[post.type]}`}>
              {post.type}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${topicColors[post.topic]}`}>
              {post.topic}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${stanceColors[post.stance]}`}>
              {post.stance}
            </span>
          </div>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}

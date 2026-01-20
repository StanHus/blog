import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

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

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-1.5 mb-3 not-prose">
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
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  )
}

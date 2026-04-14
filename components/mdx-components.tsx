import NextImage, { ImageProps } from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { CopyButton } from "./copy-button"

function Image(props: ImageProps) {
  return <NextImage {...props} style={{ height: 'auto', ...props.style }} />
}

function CustomLink(props: any) {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const components = {
  Image,
  CopyButton,
  a: CustomLink,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}

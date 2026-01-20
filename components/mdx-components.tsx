import NextImage, { ImageProps } from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

function Image(props: ImageProps) {
  return <NextImage {...props} style={{ height: 'auto', ...props.style }} />
}

const components = {
  Image,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}

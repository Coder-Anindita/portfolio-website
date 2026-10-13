import Callout from './Callout.jsx'
import CodeBlock from './CodeBlock.jsx'
import { Anchor, Image, Video, YouTube } from './Media.jsx'

// Components available in every .mdx file without importing them.
export const mdxComponents = {
  pre: CodeBlock,
  img: Image,
  a: Anchor,
  Callout,
  YouTube,
  Video,
}

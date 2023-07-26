import React, { memo } from "react"
import { ErrorBoundary } from "../../utils/ErrorBoundary"
import MDX from "@mdx-js/runtime"
import { isInSSR } from "../../utils/isInSSR"
import { MdxProvider } from "../../v2/providers/MdxProvider"

const Preview = memo(
  ({ mdx, onError }: { mdx: string; onError: () => void }) => (
    <ErrorBoundary
      key={mdx}
      fallback={() => <>Invalid format - please correct</>}
      onError={onError}
    >
      <MdxProvider renderer={MDX}>{mdx}</MdxProvider>
    </ErrorBoundary>
  ),
  (prev, curr) => prev.mdx === curr.mdx
)

export const BlogPreview = ({
  mdx,
  onError,
}: {
  mdx: string
  onError: () => void
}) => {
  if (isInSSR()) {
    return null
  }

  return <Preview mdx={mdx} onError={onError} />
}

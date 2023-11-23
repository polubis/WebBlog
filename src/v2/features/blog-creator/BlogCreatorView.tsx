import React, { useState, useEffect, useRef } from "react"
import { useModal } from "../../../ui"
import { BlogCreatorLoader } from "./containers/BlogCreatorLoader"
import { useAnalytics } from "../../../utils/useAnalytics"
import Layout from "../../containers/Layout"
import { BlogCreatorJumbo } from "./components/BlogCreatorJumbo"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import Loadable from "react-loadable"

const BlogCreatorDynamicEditor = Loadable({
  loader: () => import("./BlogCreatorDynamicEditor"),
  loading: () => null,
})

const BlogCreatorView = () => {
  const { track } = useAnalytics()
  const { isOpen, open, close } = useModal()
  const [loading, setLoading] = useState(false)
  const layout = useLayoutProvider()

  const ref = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    setLoading(true)
    track({ name: "full_screen_clicked" })
    document.body.style.overflow = "hidden"
    ref.current = setTimeout(open, 1500)
  }

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current)
    }
  }, [])

  return (
    <>
      <Layout>
        <BlogCreatorJumbo stopShowcase={isOpen}>
          <button className="upper button primary" onClick={handleOpen}>
            {layout.t.try_it}
          </button>
        </BlogCreatorJumbo>
      </Layout>
      {isOpen && <BlogCreatorDynamicEditor onClose={close} />}
      {loading && (
        <BlogCreatorLoader
          onClose={() => {
            document.body.style.overflow = "auto"
            setLoading(false)
          }}
        />
      )}
    </>
  )
}

export { BlogCreatorView }

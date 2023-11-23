import React from "react"
import { useModal } from "../../../ui"
import Layout from "../../containers/Layout"
import { BlogCreatorJumbo } from "./components/BlogCreatorJumbo"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import Loadable from "react-loadable"

const BlogCreatorDynamicEditor = Loadable({
  loader: () => import("./BlogCreatorDynamicEditor"),
  loading: () => null,
})

const BlogCreatorView = () => {
  const { isOpen, open, close } = useModal()
  const layout = useLayoutProvider()

  return (
    <>
      <Layout>
        <BlogCreatorJumbo stopShowcase={isOpen}>
          <button className="upper button primary" onClick={open}>
            {layout.t.try_it}
          </button>
        </BlogCreatorJumbo>
      </Layout>
      {isOpen && <BlogCreatorDynamicEditor onClose={close} />}
    </>
  )
}

export { BlogCreatorView }

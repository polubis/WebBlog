import React from "react"
import BlogCreator from "../components/blog-creator/BlogCreator"
import { SiteMeta } from "../utils/SiteMeta"

export default function () {
  return (
    <SiteMeta
      url="/blog-creator/"
      robots="index,follow"
      title="Real time blog creator"
      type="website"
      description="Join the community and create your first article in a fast and fun way."
    >
      <BlogCreator />
    </SiteMeta>
  )
}

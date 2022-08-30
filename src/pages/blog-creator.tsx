import React from "react"
import BlogCreator from "../components/blog-creator/BlogCreator"
import { SiteMeta } from "../utils/SiteMeta"

export default function () {
  return (
    <SiteMeta
      url="blog-creator/"
      robots="index,follow"
      title="Blog creator"
      type="website"
      image="/icon-192x192.png"
      description="Join the community and create your first article in a fast and fun way."
    >
      <BlogCreator />
    </SiteMeta>
  )
}

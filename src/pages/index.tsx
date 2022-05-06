import React from "react"

import Layout from "../components/layout/Layout"
import { SiteMeta } from "../utils/SiteMeta"

export default function (): React.ReactElement {
  return (
    <SiteMeta
      url="/"
      robots="index,follow"
      title="GreenOn Software"
      type="website"
      description="Green is a nice color."
    >
      <Layout>Home page</Layout>
    </SiteMeta>
  )
}

import React from "react"
import styled from "styled-components"
import MobileNavigation from "../../../components/navigation/MobileNavigation"
import Navbar from "../../../components/navigation/Navbar"

const Layout = styled.div``

export const LessonContent = () => {
  return (
    <Layout>
      <Navbar />
      <MobileNavigation />
    </Layout>
  )
}

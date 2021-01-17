import React from "react"

import styled from "styled-components"

import ReactImage from "../../../static/react.svg"
import AngularImage from "../../../static/angular.svg"

const ArticlesOverlays = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ArticleOverlay = styled.div`
  background-repeat: no-repeat;
  height: 350px;
  width: 350px;
  background-size: 50%;
`

export default function (): React.ReactElement {
  return (
    <ArticlesOverlays>
      <ArticleOverlay style={{ backgroundImage: `url(${ReactImage})` }} />
      <ArticleOverlay style={{ backgroundImage: `url(${AngularImage})` }} />
    </ArticlesOverlays>
  )
}

import React from "react"
import styled, { keyframes } from "styled-components"
import { usePortal } from "../../utils/usePortal"
import theme from "../../utils/theme"
import { CloseIcon, IconButton, XL } from "../../ui"
import { useWithDiscussion } from "./WithDiscussion"
import Loadable from "react-loadable"
import { CAT_ASCII } from "../../ui/snippet/LiveSnippetContent"
import { CommentsList } from "./CommentsList"

const NoComments = Loadable({
  loader: () => import("./NoComments").then(m => m.NoComments),
  loading: () => null,
})

const width = 420

const appear = keyframes`
  from {
      transform: translateX(${width}px);
      border-left-color: transparent;
  }
  to {
      transform: translateX(0);
      border-left-color: ${theme.grayC};
  }
`

const Container = styled.aside`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${theme.black};
  border-left: 1px solid transparent;
  width: ${width - 1}px;
  z-index: 99;
  animation: ${appear} 0.2s ease-in-out 0s forwards;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 99px;
  border-bottom: 1px solid ${theme.grayC};

  ${XL} {
    margin-right: auto;
  }
`

const Content = styled.div`
  height: 100%;
  padding: 20px;
  position: relative;

  & > * {
    height: 100%;
  }
`

const CatLoader = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  color: ${theme.white};
  z-index: 1;
  font-size: 8px;
  padding: 20px;

  ${XL} {
    margin-bottom: 12px;
  }
`

const DiscussionWidget = () => {
  const ctx = useWithDiscussion()
  const { render } = usePortal()

  return render(
    <Container>
      <Header>
        <XL>Discussion</XL>
        <IconButton
          rounded
          size="medium"
          variant="secondary-outlined"
          onClick={ctx.close}
        >
          <CloseIcon />
        </IconButton>
      </Header>
      <Content>
        {ctx.state.status === "loading" && (
          <CatLoader>
            <XL className="pif-paf">PIF PAF ! LEMME LOAD</XL>
            {CAT_ASCII}
          </CatLoader>
        )}
        {ctx.state.status === "loaded" && (
          <>
            {ctx.state.comments.length === 0 ? (
              <NoComments />
            ) : (
              <CommentsList comments={ctx.state.comments} />
            )}
          </>
        )}
        {ctx.state.status === "loadFailed" && <div>Load failed</div>}
      </Content>
    </Container>
  )
}

export { DiscussionWidget }

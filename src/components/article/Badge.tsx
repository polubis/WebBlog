import styled, { css } from "styled-components"

interface Props {
  color: string
  background?: string
}
// Align article content
// Publish article
// Improve audit for last article
export default styled.div<Props>`
  padding: 5px 6px;
  font-size: 12px;
  border-radius: 2px;
  width: max-content;
  text-transform: uppercase;

  ${({ color, background }) =>
    background
      ? css`
          background: ${background};
          color: ${color};
          border: 1px solid ${background};
        `
      : css`
          color: ${color};
          border: 1px solid ${color};
        `}
`

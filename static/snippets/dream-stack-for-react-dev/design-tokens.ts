// Designs tokens object.
const tokens = {
  background: {
    color: "#f0f0f0",
  },
  font: {
    color: "#000000",
    size: {
      100: "16px",
    },
  },
  boxes: {
    radius: {
      100: "4px",
    },
  },
}

// Usage in css.
css`
  h1 {
    color: ${tokens.font.color};
    font-size: ${tokens.font.size[100]};
  }
`

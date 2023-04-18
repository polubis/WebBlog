interface Theme {
  font: {
    color: string
  }
  background: {
    body: string
  }
}

const light: Theme = {
  font: {
    color: tokens.common.black,
  },
  background: {
    body: tokens.common.white,
  },
}

const dark: Theme = {
  font: {
    color: tokens.common.white,
  },
  background: {
    body: tokens.common.black,
  },
}

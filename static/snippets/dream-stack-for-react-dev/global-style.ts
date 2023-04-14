import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'LexendBold';
        src: url('./fonts/LexendBold.ttf') format('truetype');
    }
    
    @font-face {
        font-family: 'LexendLight';
        src: url('./fonts/LexendLight.ttf') format('truetype');
    }

    @font-face {
        font-family: 'LexendMedium';
        src: url('./fonts/LexendMedium.ttf') format('truetype');
    }

    @font-face {
        font-family: 'LexendRegular';
        src: url('./fonts/LexendRegular.ttf') format('truetype');
    }

    html {
        font-size: 62.5%;
    }

    /* The rest of the styles... */
`

export { GlobalStyle }

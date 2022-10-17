import { createGlobalStyle } from 'styled-components';

//Sets CSS for whole website
const GlobalStyle = createGlobalStyle`
    :root {
        --mainGreen: #5ECE7B;
        --hoverGreen: #307442;
    }

    body {
        font-family: 'Raleway', sans-serif;
    }

    button {
        font-family: 'Raleway', sans-serif;
    }
`

export default GlobalStyle;
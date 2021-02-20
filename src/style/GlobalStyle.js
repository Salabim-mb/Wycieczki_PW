import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body{
        color: white;
        background-color: ${({ theme }) => theme.color.primary};
        font-family: 'Poppins', sans-serif;
        overflow-x: hidden;
        margin: 0;
        padding:0;
    }
    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;

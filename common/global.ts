import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
    }

    body {
      margin: 0;
      font-family: 'Roboto', sans-serif;
      color: #505050;
      display: inline-block;
      @media(min-width: 768px){
        width: 100%;
      }
    } 

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Roboto', sans-serif;
      color: #2b2b2b;
    }
    
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .center {
      margin: auto;
      text-align: center;
    }
`;

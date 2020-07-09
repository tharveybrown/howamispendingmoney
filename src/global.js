import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
        flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.body} ;
    color: ${({ theme }) => theme.text} ;
    
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
button {
  display: block;
}
  .table {
    color: ${({ theme }) => theme.text} !important;
  }
  .table:hover::before {
    color: ${({ theme }) => theme.hover} !important;
  }
  .table:hover::after {
    color: ${({ theme }) => theme.hover} !important;
  }
  .card {
    background: ${({ theme }) => theme.card} ;
    color: ${({ theme }) => theme.cardText} !important;

  }
  
  .form-control {
    color: "#363537";
  }
  
`;

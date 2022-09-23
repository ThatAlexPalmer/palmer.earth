import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
	display: flex;
    flex-flow: column nowrap;
    height: 100%;
    min-height: 100%;
    padding: 0;
    margin: 0;
	background: ${({ theme }) => theme.colors.background};
	font-weight: 400;
	font-family: Archivo, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 18px;
    letter-spacing: normal;
    color: ${({ theme }) => theme.colors.text};
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  #__next {
    flex: 1;
    width: 100%;
    height: auto;
	display: flex;
}

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    margin: 0;
    padding: 0;
    cursor: pointer;

	&:hover,:focus,:active {
		text-decoration: none;
	}
  }

  button:focus {
    outline: 0;
}

* {
    box-sizing: border-box;
  }

  ::selection {
	background: ${({ theme }) => theme.colors.accent};
	color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyle;

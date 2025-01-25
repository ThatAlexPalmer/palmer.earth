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
	font-weight: 400;
    font-size: 16px;
    letter-spacing: normal;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
	font-family: ${({ theme }) => theme.typography.fontFamily};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
	letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.paragraph};
  }

	h1, h2, h3 {
        font-family: ${({ theme }) => theme.typography.headingFont};
        font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
        line-height: ${({ theme }) => theme.typography.lineHeight.heading};
        text-transform: uppercase;
        letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
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

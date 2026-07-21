import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    color-scheme: dark;
  }

  html,
  body {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    min-height: 100%;
    padding: 0;
    margin: 0;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    font-size: 16px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.paragraph};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Faint terminal grid — fixed, non-interactive, below content */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image:
      linear-gradient(
        to right,
        rgba(255, 255, 255, ${({ theme }) => theme.grid.opacity}) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgba(255, 255, 255, ${({ theme }) => theme.grid.opacity}) 1px,
        transparent 1px
      );
    background-size: ${({ theme }) => theme.grid.cell} ${({ theme }) => theme.grid.cell};
    mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, #000 20%, transparent 75%);
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.heading};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  }

  #__next {
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.link};

    &:hover,
    &:focus-visible,
    &:active {
      text-decoration: none;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.g68};
      outline-offset: 3px;
    }
  }

  button:focus {
    outline: 0;
  }

  button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.g68};
    outline-offset: 2px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }

  /* Minimal monochrome scrollbars */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.g20};
    border-radius: ${({ theme }) => theme.radius.md};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.g60};
  }

  @keyframes caret-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`;

export default GlobalStyle;

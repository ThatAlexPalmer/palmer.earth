"use client";

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

  /*
   * No grid / honeycomb — those read as dated UI chrome.
   * Soft radial depth only: flat black core with a quiet accent bloom
   * so the RedBlock still owns the page.
   */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 85% 55% at 50% -20%, rgba(163, 45, 21, 0.09), transparent 55%),
      radial-gradient(ellipse 50% 40% at 100% 100%, rgba(163, 45, 21, 0.04), transparent 50%);
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.heading};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
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
      border-radius: ${({ theme }) => theme.radius.sm};
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
    color: #ffffff;
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

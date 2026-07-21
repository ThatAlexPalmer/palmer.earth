import { createGlobalStyle } from "styled-components";

/**
 * Background: no grid. Layered radial washes (accent glow + soft haze)
 * plus a CSS noise film. Minimal but not flat.
 */
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

  /* Atmospheric depth — soft accent bloom + edge haze (not a grid) */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 90% 55% at 50% -15%, ${({ theme }) => theme.colors.glow}, transparent 58%),
      radial-gradient(ellipse 45% 35% at 100% 100%, ${({ theme }) => theme.colors.glowSoft}, transparent 55%),
      radial-gradient(ellipse 40% 30% at 0% 85%, ${({ theme }) => theme.colors.haze}, transparent 50%),
      radial-gradient(ellipse 70% 50% at 50% 110%, rgba(0, 0, 0, 0.55), transparent 60%);
  }

  /* Fine film grain via SVG turbulence — texture without structure */
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.045;
    mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 180px 180px;
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

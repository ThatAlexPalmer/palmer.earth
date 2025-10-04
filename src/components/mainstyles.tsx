import styled from "styled-components";

// Centralized breakpoints for consistency
const breakpoints = {
    phone: "512px",
    tablet: "768px",
    smallLaptop: "820px",
} as const;

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 1200px;
    min-height: 100%;
    margin: 0 auto;
    padding: 2rem 4%;

    @media (max-width: ${breakpoints.tablet}) {
        padding: 1.5rem 3%;
    }
`;

const Main = styled.main`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    align-self: center;
    justify-content: flex-start;
    flex: 1;
    width: 100%;
    max-width: 1600px;
    height: auto;

    /** Small laptops and equivalent devices */
    @media only screen and (max-width: ${breakpoints.smallLaptop}) {
        width: 100%;
    }

    /** Generic tablet and equivalent devices */
    @media only screen and (max-width: ${breakpoints.tablet}) {
        width: 98%;
        margin: 0 auto;
    }

    /** iPhone portrait mode and equivalent devices */
    @media only screen and (max-width: ${breakpoints.phone}) {
        width: 96%;
    }
`;

const Nav = styled.nav`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-self: center;
    align-items: baseline;
    width: 100%;
    height: auto;

    .controls {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin: 0.5rem 0;
        font-size: ${({ theme }) => theme.typography.fontSize.uiCopy};

        /** iPhone portrait mode and equivalent devices */
        @media only screen and (max-width: ${breakpoints.phone}) {
            align-items: center;
            font-size: ${({ theme }) => theme.typography.fontSize.uiCopyMobile};
        }
    }

    a {
        color: ${({ theme }) => theme.colors.text};
        font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
        text-decoration: none;
        transition:
            color 120ms ease-in-out,
            text-underline-offset 120ms ease-in-out;

        &:hover,
        &:focus-visible,
        &:active {
            color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline;
            text-decoration-thickness: 0.08rem;
            text-underline-offset: 0.2rem;
        }
        padding: 0 1rem 0 0;

        &:last-child {
            padding: 0;
        }
    }

    @media screen and (max-width: ${breakpoints.phone}) {
        width: 98%;
    }
`;

const H1 = styled.h1`
    position: relative;
    display: inline-flex;
    line-height: 1.25;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: ${({ theme }) => theme.typography.fontSize.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    text-align: center;
    text-decoration: none;
    margin: 0 auto;
    max-width: 24rem;

    /** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: ${breakpoints.tablet}) {
        margin: 2rem auto;
    }

    /** iPhone portrait mode and equivalent devices */
    @media only screen and (max-width: ${breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.headingMobile};
    }
`;

const H2 = styled.h2`
    z-index: 2;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 24rem;
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-size: ${({ theme }) => theme.typography.fontSize.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    text-align: justify;
    margin: 12.5rem auto 0; /* 200px -> 12.5rem for scalability */
    text-transform: uppercase;

    /** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: ${breakpoints.tablet}) {
        font-size: ${({ theme }) => theme.typography.fontSize.headingMobile};
    }

    @media screen and (max-width: ${breakpoints.phone}) {
        width: 16rem;
    }
`;

const RedBlock = styled.span`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-self: center;
    width: 100%;
    height: auto;

    &::before {
        content: "";
        z-index: 1;
        display: block;
        position: absolute;
        width: 100%;
        height: 83%;
        background-color: ${({ theme }) => theme.colors.accent};
    }

    @media screen and (max-width: ${breakpoints.phone}) {
        width: 98%;
    }
`;

const P = styled.p`
    max-width: 696px;
    text-align: left;
    margin: 1.618rem auto;
    line-height: 1.618;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    letter-spacing: 0.01618rem;

    a {
        color: ${({ theme }) => theme.colors.accent};
        font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
        text-decoration: underline;
        text-underline-offset: 0.12rem;
        &:hover,
        &:focus-visible,
        &:active {
            text-decoration-thickness: 0.3rem;
        }
    }

    @media screen and (max-width: ${breakpoints.phone}) {
        font-size: ${({ theme }) => theme.typography.fontSize.paragraphMobile};
        margin: 1rem auto;
        text-align: justify;
        line-height: 1.318;
    }
`;

const Footer = styled.footer`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    width: 100%;
    height: 8rem;
    margin: 0 auto;
    padding: 0;

    a {
        color: ${({ theme }) => theme.colors.text};
        text-decoration: none;
        transition:
            color 120ms ease-in-out,
            text-underline-offset 120ms ease-in-out;
        &:hover,
        &:focus-visible,
        &:active {
            color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline;
            text-decoration-thickness: 0.1rem;
            text-underline-offset: 0.2rem;
        }
    }
`;

export { Container, Main, H1, Nav, H2, RedBlock, P, Footer };

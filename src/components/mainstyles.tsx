import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 1200px;
    min-height: 100%;
    margin: 0 auto;
    padding: 2rem 4%;

    @media (max-width: 768px) {
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
    width: 98%;
    max-width: 1600px;
    height: auto;

    @media only screen and (max-width: 820px) {
        width: 100%;
    }
    /** Generic tablet and equivalent devices */
    @media only screen and (max-width: 768px) {
        width: 98%;
        margin: 0 auto;
    }
    /** iPhone portrait mode and equivalent devices */
    @media only screen and (max-width: 512px) {
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
    @media only screen and (max-width: 512px) {
		align-items: center;
        font-size: ${({ theme }) => theme.typography.fontSize.uiCopyMobile};
    }

	}

	a {
		color: ${({ theme }) => theme.colors.text};
		&:hover,
        :focus,
        :active {
			color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline solid 0.8rem;
        }
		padding: 0 1rem 0 0;
		
		&:last-child {
			padding: 0;
		}
	}

	@media screen and (max-width: 512px) {
		width: 98%;
	}
`;

const H1 = styled.h1`
	position: relative;
	display: inline-flex;
    line-height: 1.25;
    font-size: ${({ theme }) => theme.typography.fontSize.heading};
    text-align: center;
    text-decoration: none;
	margin: 0 auto;
	max-width: 24rem;

	/** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: 768px) {
		margin: 2rem auto;
    }

    /** iPhone portrait mode and equivalent devices */
    @media only screen and (max-width: 512px) {
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
  	font-size: ${({ theme }) => theme.typography.fontSize.heading};
  	text-align: justify;
  	margin: 200px auto 0px;
  	text-transform: uppercase;

	/** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.typography.fontSize.headingMobile};
    }

  	@media screen and (max-width: 512px) {
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
    content: '';
    z-index: 1;
    display: block;
    position: absolute;
    width: 100%;
    height: 83%;
    background-color: ${({ theme }) => theme.colors.accent};
  }

  @media screen and (max-width: 512px) {
    width: 98%;
  }
`;

const P = styled.p`
	max-width: 696px;
    text-align: left;
	margin: 1.618rem auto;
    line-height: 1.618;
    font-size: ${({ theme }) => theme.typography.fontSize.paragraph};
	letter-spacing: 0.01618rem;

	a {
        color: ${({ theme }) => theme.colors.accent};
        &:hover,
        :focus,
        :active {
            text-decoration: underline solid 0.3rem;
        }
    }

	@media screen and (max-width: 512px) {
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
		&:hover,
        :focus,
        :active {
			color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline solid 1rem;
        }
	}
`;

export { Container, Main, H1, Nav, H2, RedBlock, P, Footer };

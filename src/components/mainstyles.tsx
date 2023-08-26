import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    align-self: flex-start;
    justify-content: flex-start;
    width: auto;
    max-width: 2450px;
    min-height: 100%;
    margin: auto;
    padding: 0 4%;
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

const H1 = styled.h1`
	position: relative;
	display: inline-flex;
    line-height: 1.25;
    font-size: 2rem;
    text-align: left;
    text-decoration: none;

	/** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: 768px) {
        font-size: 2rem;
		margin: 2rem 0;
    }

    /** iPhone portrait mode and equivalent devices */
    @media only screen and (max-width: 512px) {
        font-size: 1.2rem;
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
		display: flex;
		flex-flow: row nowrap;
		margin: 3rem 0;
		font-size: 1.2rem;
		

		/** iPhone portrait mode and equivalent devices */
    @media only screen and (max-width: 512px) {
		align-items: center;
        font-size: 1rem;
    }

	}

	a {
		color: ${({ theme }) => theme.colors.text};
		&:hover,
        :focus,
        :active {
			color: ${({ theme }) => theme.colors.accent};
            text-decoration: underline solid 1rem;
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

const H2 = styled.h2`
	position: relative;
  	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	align-self: center;
	width: 24rem;
  	font-size: 2rem;
  	font-weight: 300;
    margin: 2rem 0;
    line-height: 1.25;
    text-align: justify;
    text-transform: uppercase;

	/** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: 768px) {
        font-size: 1.6rem;
    }

  	@media screen and (max-width: 512px) {
    	font-size: 1.4rem;
    	width: 16rem;
	}

  	@media screen and (max-width: 414px) {
    	font-size: 1.3rem;
    	width: 14rem;
  	}
`;

const StylizedHeading = styled.h2`
	z-index: 2;
  	position: relative;
  	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	align-self: center;
  	width: 24rem;
  	font-size: 2rem;
  	font-weight: 300;
  	text-align: justify;
  	margin: 150px auto -1px;
  	text-transform: uppercase;

	/** iPad portrait mode and equivalent devices */
    @media only screen and (max-width: 768px) {
        font-size: 1.6rem;
    }

  	@media screen and (max-width: 512px) {
    	font-size: 1.4rem;
    	width: 16rem;
	}

  	@media screen and (max-width: 414px) {
    	font-size: 1.3rem;
    	width: 14rem;
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
    height: 98%;
    background-color: #ba382c;
  }

  @media screen and (max-width: 512px) {
    width: 98%;
  }
`;

const P = styled.p`
	max-width:680px;
    text-align: left;
	margin: 1.618rem auto;
    line-height: 1.618;
    font-size: 1.3rem;
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
    	font-size: 1rem;
		margin: 1rem auto;
		text-align: justify;
		line-height: 1.318;
	}
`;
const CodeTag = styled.code`
    background: #000000;
    border-radius: 5px;
    margin: 0 0.75rem;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
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

export { Container, Main, H1, Nav, H2, StylizedHeading, RedBlock, P, CodeTag, Footer };

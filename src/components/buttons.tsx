import styled from "styled-components";
import Link from "next/link";

const StyledA = styled.a`
	display: flex;
	align-content: center;
    align-items: center;
    justify-content: space-around;
	width: 100%;
	height: 100%;
    font-size: 1rem;
	color: ${({ theme }) => theme.colors.text};

	&:hover,
    :focus,
    :active {
        color: ${({ theme }) => theme.colors.accent};
    }
`;

const StyledLink = ({ href, name }) => (
	<Link href={href} passHref>
		<StyledA>{name}</StyledA>
	</Link>
);

export { StyledLink };
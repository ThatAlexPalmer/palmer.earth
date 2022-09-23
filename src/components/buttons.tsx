import styled from "styled-components";
import Link from "next/link";


const Button = styled.button`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: center;
	width: 13rem;
	height: 2rem;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
	background: ${({ theme }) => theme.colors.accent};
    border: none;
    border-radius: 16px;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover,
    :focus,
    :active {
		background: ${({ theme }) => theme.colors.text};
        color: ${({ theme }) => theme.colors.background};
		text-decoration: none;
    }
`;

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

export default function Buttons() {
	return (
		<>
			<Button>
				<StyledLink href="/writing" name="Writing &rarr;" />
			</Button>
		</>
	);
}

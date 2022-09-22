import styled from 'styled-components'
import Link from 'next/link'

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  max-width: 800px;
  margin-top: 4rem;
`

const Card = styled.div`
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100%;

  &:hover,
  :focus,
  :active {
    color: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`

const StyledA = styled.a`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`

const StyledLink = ({ href, name }) => (
  <Link href={href} passHref>
    <StyledA>{name}</StyledA>
  </Link>
)

export default function Cards() {
  return (
    <FlexContainer>
      <Card>
        <StyledLink href="/writing" name="Writing Page &rarr;" />
      </Card>
    </FlexContainer>
  )
}

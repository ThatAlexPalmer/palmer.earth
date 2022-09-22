import Link from 'next/link'
import { Container, Main, Title, Description } from '../components/componentstyles'

export default function Writing() {
  return (
    <Container>
      <Main>
        <Title>Writing Page</Title>
        <Description>
          <Link href="/">
            <a>&larr; Go Back</a>
          </Link>
        </Description>
      </Main>
    </Container>
  )
}

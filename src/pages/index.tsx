import Head from 'next/head'
import {
  Container,
  Main,
  Title,
  Description,
  CodeTag,
} from '../components/componentstyles'
import Cards from '../components/cards'

export default function Home() {
  return (
    <Container>
		  <Head>
			  <meta charSet="utf-8" />
			  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
			  <title>Alex Palmer</title>
			  <meta name="author" content="Alex Palmer" />
			  <meta
				  name="description"
				  content="Co-founder of Poet Network. Former director of product at Lienfluent, Tribe. Angel investing small cheques at the earliest stages."
			  />

			  <meta property="og:type" content="website" />
			  <meta property="og:site_name" content="Alex Palmer" />
			  <meta property="og:url" content="https://palmer.earth" />
			  <meta property="og:title" content="Alex Palmer" />
			  <meta
				  property="og:description"
				  content="Co-founder of Poet Network. Former director of product at Lienfluent, Tribe. Angel investing small cheques at the earliest stages."
			  />
			  <meta property="og:image" content="https://palmer.earth/og-avatar.jpg" />
			  <meta property="og:image:type" content="image/jpg" />
			  <meta property="og:image:width" content="279" />
			  <meta property="og:image:height" content="279" />
			  
			  <meta name="theme-color" content="#ba382c" />
			  <link rel="canonical" href="https://palmer.earth" />
			  <link rel="manifest" href="/site.webmanifest" />

			  <link rel="icon" href="/favicon.ico" />
			  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

			  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2d2f33" />
			  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			  <meta name="theme-color" content="#2d2f33" />
			  <meta name="msapplication-TileColor" content="#2d2f33" />
			  <noscript>If you're seeing this message, that means <strong>JavaScript has been disabled in your browser</strong>. Please <strong>enable JS</strong> to make this website work. If you're not sure how to do that, you can go to <a href="https://www.enable-javascript.com/">https://www.enable-javascript.com/</a> for a quick reminder!</noscript>
		  </Head>
      <Main>
        <Title>
          Welcome to <a href="https://palmer.earth">palmer.earth</a>
        </Title>

        <Description>
          Sample code tag looks like this: <CodeTag>pages/index.tsx</CodeTag>
        </Description>

        <Cards />
      </Main>
    </Container>
  )
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Kerri Sharp" />
        <meta property="og:title" content="Razor Sharp" />
        <meta property="og:description" content="Digital handyman services to give your business the cutting edge" />
        <meta property="og:url" content="https://razor.wtf" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Razor Sharp" />
        <meta name="twitter:description" content="Digital handyman services to give your business the cutting edge" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="container mx-auto max-w-5xl px-5">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}

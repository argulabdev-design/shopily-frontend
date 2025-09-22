import Head from "next/head";


const SEO = ({pageTitle}) => (
  <>
    <Head>
      <title>
        {pageTitle ? `${pageTitle} - Shoily Electronics` : 'Shoily Electronics - Your Modern Electronics Store'}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content="Shoily Electronics - Your one-stop shop for all electronics and gadgets" />
      <meta name="robots" content="noindex, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  </>
);

export default SEO;
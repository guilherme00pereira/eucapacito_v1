import Head from "next/head";

const SEO = ({metadata}) => {
    return  (
        <Head>
            <title>Eu Capacito {metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="canonical" href="https://www.eucapacito.com.br/" />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:url" content="https://www.eucapacito.com.br/" />
            <meta property="og:site_name" content="Eu Capacito" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metadata.og_title} />
            <meta property="og:description" content={metadata.og_description} />
            <meta property="article:modified_time" content={metadata.article_modified_time} />
        </Head>
    )
}

export default SEO;
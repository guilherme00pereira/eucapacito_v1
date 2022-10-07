import Head from "next/head";

const SEO = ({title, description, siteTitle, modified}) => {
    return  (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href="https://www.eucapacito.comm.br/" />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:url" content="https://www.eucapacito.comm.br/" />
            <meta property="og:site_name" content="Eu Capacito" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="article:modified_time" content={modified} />
        </Head>
    )
}

export default SEO;
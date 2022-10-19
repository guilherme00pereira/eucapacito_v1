import Head from "next/head";

const SEO = ({metadata}) => {
    return  (
        <Head>
            <title>Eu Capacito {metadata.title}</title>
            {metadata.og_image &&
                <meta property='og:image' content={metadata.og_image[0].url} />
            }
            <meta name="description" content={metadata.description} />
            <link rel="canonical" href={metadata.canonical} />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:url" content="metadata.og_url" />
            <meta property="og:site_name" content="Eu Capacito" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metadata.og_title} />
            <meta property="og:description" content={metadata.og_description} />
            <meta property="article:modified_time" content={metadata.article_modified_time} />
        </Head>
    )
}

export default SEO;
import {useContext, useEffect} from "react";
import parse from 'html-react-parser';
import apiService from "../src/services/apiService";
import {Box} from "@mui/material";
import {AppContext} from "../src/services/context";
import SEO from '../src/seo'

const TermosEServicos = ({ content, metadata }) => {
    const ctx = useContext(AppContext)

    useEffect(() => {
        ctx.setTitle({
            main: "Termos e Serviços",
            sub: "Política de privacidade",
        });
    }, []);

    return (
        <Box sx={styles.root}>
            <SEO metadata={metadata} />
            <h1>Política de Privacidade - LGPD</h1>
            <hr />
            {parse(content)}
        </Box>
    );
};

export async function getStaticProps() {
    const {api} = apiService;

    let res         = await api.get('/eucapacito/v1/terms-and-services')
    const content   = res.data.items[0].items[0].value.content
    res             = await api.get("/wp/v2/pages/" + process.env.PAGE_TERMS)
    const metadata  = {
          title: res.data.yoast_head_json.og_title,
          description: res.data.yoast_head_json.description,
          og_title: res.data.yoast_head_json.og_title,
          og_description: res.data.yoast_head_json.og_description,
          article_modified_time: res.data.yoast_head_json.article_modified_time ?? null,
        og_url: res.data.yoast_head_json.og_url.replace('wp.eucapacito', 'www.eucapacito'),
        canonical: res.data.yoast_head_json.canonical.replace('wp.eucapacito', 'www.eucapacito')
        }

    return { props: { content, metadata }}

}

export default TermosEServicos;

const styles = {
    root: {
        h1: { marginTop: "2rem", fontSize: "22px", color: "#CAC8C8" },
        hr: { border: 0, borderTop: "1px solid #77837F" },
        ".MuiContainer-root": {
            pb: "100px",
        },
        p: {
            lineHeight: "1.7"
        }
    },
}
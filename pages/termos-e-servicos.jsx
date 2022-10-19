import {useContext, useEffect} from "react";
import parse from 'html-react-parser';
import apiService from "../src/services/apiService";
import {Box} from "@mui/material";
import {AppContext} from "../src/services/context";
import SEO from '../src/seo'
import {extractYoastData} from "../src/services/helper";

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
    const metadata  = extractYoastData(res.data.yoast_head_json)
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
import {useContext, useEffect, useState} from "react";
import parse from 'html-react-parser';
import apiService from "../src/services/apiService";
import {Box} from "@mui/material";
import {AppContext} from "../src/services/context";

const TermosEServicos = ({ content }) => {
    const ctx = useContext(AppContext)

    useEffect(() => {
        ctx.setTitle({
            main: "Termos e Serviços",
            sub: "Política de privacidade",
        });
    }, []);

    return (
        <Box sx={styles.root}>
            <h1>Política de Privacidade - LGPD</h1>
            <hr />
            {parse(content)}
        </Box>
    );
};

export async function getServerSideProps() {
    const {api} = apiService;

    let res = await api.get('/eucapacito/v1/terms-and-services')
    const content = res.data.items[0].items[0].value.content

    return { props: { content }}

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
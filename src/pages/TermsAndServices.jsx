import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import apiService from "../services/apiService";
import {useOutletContext} from "react-router-dom";
import {Box} from "@mui/material";

const TermsAndServices = () => {
    const [title, setTitle] = useOutletContext();
    const [content, setContent] = useState("");
    const {api} = apiService;

    useEffect(() => {
        setTitle({
            main: "Quem Somos",
            sub: "Saiba mais sobre",
        });
        api.get('/eucapacito/v1/terms-and-services').then( (res) => {
            setContent(res.data.items[0].items[0].value.content)
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

export default TermsAndServices;

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
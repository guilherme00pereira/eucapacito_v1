import { useEffect, useContext, useState } from "react";
import { AppContext } from "../src/services/context";
import Script from 'next/script'
import { Box } from "@mui/material";

const PesquisaDeSatisfacao = () => {
    const ctx = useContext(AppContext);
    
    useEffect(() => {
        ctx.setTitle({
          main: "Quem Somos",
          sub: "Saiba mais sobre",
        });
        if(window.RDStationForms) {
            new window.RDStationForms('ec-pesquisa-satisfacao-oficial-550608fd5a046541c2fc', 'UA-176452904-1').createForm()
        }
    }, []);

    return (
        <Box>
            <Script src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js" />
            <div role="main" id="ec-pesquisa-satisfacao-oficial-550608fd5a046541c2fc"></div>
        </Box>
    );
};

export default PesquisaDeSatisfacao;
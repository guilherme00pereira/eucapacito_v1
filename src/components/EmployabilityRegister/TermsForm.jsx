import {Grid, FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import Button from "../Button";
import formStyle from "./formStyle";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const TermsForm = ({form, handler}) => {
    let navigate = useNavigate();
    const telefone = `(${form.ddd}) ${form.phone}`;
    const data_nascimento = `${form.day}/${form.month}/${form.year}`

    const handleSubmit = () => {
        navigate('/concluido');
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    return (
        <>
        <FormGroup sx={styles.root}>
            <p>
                Estou ciente de que minha inscrição e realização de treinamentos não
                significam garantia de vaga de emprego ou qualquer vínculo empregatício.
            </p>

            <Grid container rowSpacing={1} sx={styles.gridCheckbox}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={form.awareness}
                                onChange={(e) => handler({...form, awareness: e.target.value})}
                            />
                        }
                        label="Sim, estou ciente."
                        sx={styles.checkbox}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={form.shareData}
                                onChange={(e) => handler({...form, shareData: e.target.value})}
                            />
                        }
                        label="Concordo em compartilhar meus dados preenchidos neste formulário."
                        sx={styles.checkbox}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button sx={styles.buttonCadastrar} onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                </Grid>

                <Grid item xs={12} sx={styles.agree}>
                    <small>
                        Ao informar meus dados, eu concordo com a<br /> Política de Privacidade.
                    </small>
                </Grid>
            </Grid>
        </FormGroup>
            <form name="comece-agora-data" onSubmit={handleSubmit} style={{display: "none"}}>
                <input type="text" name={form.name} value={form.name}/>
                <input type="text" name={data_nascimento} value={data_nascimento}/>
                <input type="text" name={form.cpf} value={form.cpf}/>
                <input type="text" name={form.email} value={form.email}/>
                <input type="text" name={telefone} value={telefone}/>
                <input type="text" name={form.city} value={form.city}/>
                <input type="text" name={form.gender} value={form.gender}/>
                <input type="text" name={form.color} value={form.color}/>
                <input type="text" name={form.level} value={form.level}/>
                <input type="text" name={form.course} value={form.course}/>
                <input type="text" name={form.awareness} value={form.awareness}/>
                <input type="text" name={form.shareData} value={form.shareData}/>
                <input type="submit" value="Enviar" />
            </form>
        </>
    );
};

export default TermsForm;

const styles = {
    ...formStyle,
    buttonCadastrar: {
        display: "flex",
        m: "0 auto",
        px: "3.5rem",
    },
    agree: {textAlign: "center", py: "10px"}
};

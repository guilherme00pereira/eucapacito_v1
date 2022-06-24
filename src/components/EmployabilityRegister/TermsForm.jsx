import {Grid, FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import Button from "../Button";
import formStyle from "./formStyle";

const TermsForm = ({form, handler, step}) => {

    return (
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
                    <Button sx={styles.buttonCadastrar} onClick={() => step()}>
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

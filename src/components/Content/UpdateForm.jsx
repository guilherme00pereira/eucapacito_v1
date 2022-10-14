import {useState, useEffect} from "react";
import {Box, FormControl, OutlinedInput, InputAdornment} from "@mui/material";
import {PersonOutlined, MailOutlined} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import Button from "../Button";
import {messageReturn} from "../../commonStyles/messageReturn";
import CheckImage from "../../../public/assets/img/check.png";

const UpdateForm = () => {
    const [fields, setFields] = useState({
        name: "",
        email: "",
    });
    const [hideMessage, setHideMessage] = useState(true);

    const handleFieldChange = (field) => (e) =>
        setFields({...fields, [field]: e.target.value});

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    return (
        <Box sx={styles.form}>
            <Box>
                {hideMessage ?
                    <Box sx={styles.formWrapper}>

                        <p>Inscreva-se para receber atualizações</p>

                        <form>
                            <FormCtrl>
                                <OutlinedInput
                                    required
                                    id="name"
                                    type="text"
                                    value={fields.name}
                                    onChange={handleFieldChange("name")}
                                    placeholder="Nome"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonOutlined/>
                                        </InputAdornment>
                                    }
                                />
                            </FormCtrl>

                            <FormCtrl>
                                <OutlinedInput
                                    required
                                    id="email"
                                    type="email"
                                    value={fields.email}
                                    onChange={handleFieldChange("email")}
                                    placeholder="E-mail"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MailOutlined/>
                                        </InputAdornment>
                                    }
                                />
                            </FormCtrl>

                            <FormCtrl
                                sx={{
                                    //css desktop
                                    alignItems: {
                                        md: "center",
                                    },
                                    //css desktop
                                    "& .MuiButton-root": {
                                        padding: {
                                            md: "6px 116px",
                                        },
                                    },
                                }}
                            >
                                <Button type="submit" sx={{mt: 2}} onClick={() => setHideMessage(false)}>
                                    Enviar
                                </Button>
                            </FormCtrl>
                        </form>
                    </Box>
                    :
                    <Box sx={messageReturn}>
                        <img src={CheckImage} alt={"inscrição concluída"} />
                        <h2>Inscrição Concluída</h2>
                        <span>Obrigado por se inscrever em nossa newsletter</span>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default UpdateForm;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.5rem 0;
  p{
      font-weight:300;
      color:#FFFFFF,
  }
`);

const styles = {
    formWrapper: {
        m: "2.5rem 1.5rem 2rem",
        "& p": {
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "300"
        },
        "& .MuiOutlinedInput-input": {
            padding: "10px 7px",
            fontSize: "14px",
            fontWeight: "500"
        },
    },
    form: {
        maxWidth: "900px",
        "& .MuiBox-root": {
            margin: {
                md: "6.5rem 5.5rem 2rem",
            },
        },
        margin: "0 auto",
    },
}

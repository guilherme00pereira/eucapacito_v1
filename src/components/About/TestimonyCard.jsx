import {Box, Stack, Rating} from "@mui/material";
import Button from "../../../src/components/Button";

const TestimonyCard = ({testimonial, openModal, updateSelected}) => {

    const handleOpenModal = () => {
        openModal(true)
        updateSelected(testimonial)
    }

    return (
        <Stack display="flex" direction="column" sx={styles.boxWrapper}>
            <Stack display="flex" direction="row" justifyContent="space-between" sx={{mb: "20px"}}>
                <Stack display="flex" direction="column">
                    <Rating defaultValue={testimonial.rating} precision={0.5} size="small" readOnly/>
                    <small>{testimonial.tempo}</small>
                </Stack>
                <Stack display="flex" direction="column" alignItems="flex-end">
                    <Box sx={styles.name}>{testimonial.nome}</Box>
                    <Box>{testimonial.curso}</Box>
                </Stack>
            </Stack>
            <Box>
                {testimonial.texto.length > 120 ? testimonial.texto.substring(0, 120) + "..." : testimonial.texto}
            </Box>
            {testimonial.texto.length > 120 &&
                <Stack display="flex" direction="row" justifyContent="center" sx={styles.buttonBox}>
                    <Button type="button" sx={styles.button} onClick={handleOpenModal}>
                        ver mais
                    </Button>
                </Stack>
            }
        </Stack>

    );
};

export default TestimonyCard;

const styles = {
    boxWrapper: {
        color: "#77837F",
        border: "1px solid #77837F",
        borderRadius: "0.5rem",
        p: "20px",
        height: "260px",
        width: "100%"
    },
    name: {
        borderBottom: "2px solid #77837F",
        pb: "6px"
    },
    buttonBox: {
        mt: "auto",
    },
    button: {
        textTransform: "uppercase",
        fontSize: "0.625rem",
        color: "#0E0E0E"
    }
}
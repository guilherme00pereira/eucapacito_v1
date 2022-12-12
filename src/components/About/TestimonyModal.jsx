import {Box, Stack, Rating} from "@mui/material";
import Modal from '@mui/material/Modal';

const TestimonyModal = ({testimonial, open, openModal}) => {

    return (
        <Modal
        open={open}
        onClose={() => openModal(false)}
        sx={styles.modal}>
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
                    {testimonial.texto}
                </Box>
            </Stack>
        </Modal>
    );
};

export default TestimonyModal;

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
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "600px",
        boxShadow: "24",
        p: "4",
    }
}
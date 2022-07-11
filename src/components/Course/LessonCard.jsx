import React from 'react';
import {Box} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";

const LessonCard = ({lesson}) => {
    return (
        <Box sx={styles.root}>
            <Box sx={styles.info}>
                {lesson.title}
            </Box>
            <CheckCircle sx={styles.check} />
        </Box>
    );
};

export default LessonCard;

const styles = {
    root: {

    },
    info: {
        border: "1px solid #77837F"
    },
    check: {
        color: "#33EDAC",
        backgroundColor: "white",
        borderRadius: "50%"
    }
}
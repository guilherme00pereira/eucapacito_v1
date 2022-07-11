import React from 'react';
import {Box} from "@mui/material";

const LessonCard = ({index, lesson}) => {
    return (
        <Box sx={styles.root}>
            <Box sx={styles.info}>
                <Box sx={styles.info.index}>
                    {(index + 1).toString().padStart(2,'0')}
                </Box>
                <Box>
                    {lesson.title}
                </Box>
                <Box>
                    
                </Box>
                
            </Box>
        </Box>
    );
};

export default LessonCard;

const styles = {
    root: {
        width: "100%",
    },
    info: {
        display: "flex",
        flexDirection: "row",
        borderRadius: "0.5rem",
        border: "1px solid #77837F",
        margin: "-10px 0 10px 0",
        padding: "20px 10px",
        index: {
            fontSize: "1.5rem",
            width: "50px",
        },
    },
}
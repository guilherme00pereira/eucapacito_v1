import React from 'react';
import {Box} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";

const LessonCard = ({lesson, index}) => {
    return (
        <Box sx={styles.root}>
            <Box sx={styles.info}>
                <Box sx={styles.info.index}>
                    {index + 1}
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
        justifyContent: "space-between",
        borderRadius: "0.5rem",
        border: "1px solid #77837F",
        margin: "-10px 0 10px 0",
        padding: "20px 10px",
        index: {
            fontSize: "1.5rem"
        }
    },
}
import {NavLink} from "react-router-dom";
import {Box} from "@mui/material";

const LessonCard = ({index, lesson, active}) => {
    return (
        <NavLink to={`/lessons/${lesson.slug}`}>
            <Box sx={styles.root}>
                <Box sx={styles.info} style={active ? {border: "1px solid #33EDAC"} : {border: "1px solid #77837F"} }>
                    <Box sx={styles.info.index} style={active ? {color: "#33EDAC"} : {color: "#77837F"} }>
                        {(index + 1).toString().padStart(2,'0')}
                    </Box>
                    <Box style={active ? {color: "#33EDAC"} : {color: "#77837F"} }>
                        {lesson.title}
                    </Box>
                    <Box>

                    </Box>

                </Box>
            </Box>
        </NavLink>
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
        margin: "-10px 0 10px 0",
        padding: "20px 10px",
        index: {
            fontSize: "1.5rem",
            width: "50px",
        },
    },
}
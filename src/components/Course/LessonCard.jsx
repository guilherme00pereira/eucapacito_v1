import {NavLink} from "react-router-dom";
import {Box} from "@mui/material";
import { PlayCircleOutlined } from "@mui/icons-material";

const LessonCard = ({index, lesson, active, course}) => {


    return (
        <NavLink to={`/lessons/${lesson.slug}/${course}`}>
            <Box sx={styles.root}>
                <Box sx={styles.info} style={active ? {border: "1px solid #33EDAC"} : {border: "1px solid #77837F"} }>
                    <Box sx={styles.info.index} style={active ? {color: "#33EDAC"} : {color: "#77837F"} }>
                        {(index + 1).toString().padStart(2,'0')}
                    </Box>
                    <Box style={active ? {color: "#33EDAC"} : {color: "#77837F"} }>
                        <h3>{lesson.title}</h3>
                        <small>{lesson.duration}</small>
                    </Box>
                    <Box>
                        <PlayCircleOutlined />
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
        h3: {
            fontSize: {
                md: "1.25em",
                xs: "1em",
            },
            my: "0"
        }
    },
    info: {
        minHeight: "90px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        borderRadius: "0.5rem",
        margin: "-10px 0 10px 0",
        padding: "15px 15px",
        index: {
            fontSize: "1.5rem",
            width: "50px",
        },
        "& :last-child": {
            marginLeft: "auto",
            color: "#77837F"
        }
    },
}
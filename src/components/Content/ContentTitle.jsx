import ContentLink from './ContentLink';
import {Box} from "@mui/material";

const ContentTitle = ({title, linkText, to}) => {
    return (
        <>
            <Box sx={styles.box}>
                <div>
                    <h1>{title}</h1>
                </div>
                <ContentLink title={linkText} to={to} />
            </Box>
            <hr />
        </>
    );
};

export default ContentTitle;

const styles = {
    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
    }
}
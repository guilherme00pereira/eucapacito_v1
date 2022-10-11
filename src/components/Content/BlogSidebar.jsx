import apiService from "../../services/apiService";
import {Box, Stack} from "@mui/material";
import NewsPost from "./NewsPost";

const BlogSidebar = ({posts}) => {

    return (
        <Stack sx={styles.sideColumn}>
            <Stack sx={styles.newsContainer}>
                <h3>Últimas notícias</h3>
                <Box container sx={styles.news}>
                    {posts.length > 0 &&
                        posts.map((post) => (
                            <NewsPost key={post.id} post={post}/>
                        ))
                    }
                </Box>
            </Stack>
        </Stack>

    );
};

export default BlogSidebar;

const styles = {
    sideColumn: {
        flex: "1",
        borderLeft: "1px solid #77837F",
        pl: "20px",
        "& h3": {
            textTransform: "uppercase",
            color: "#33EDAC",
            fontWeight: "400",
            fontSize: "18px",
            mt: "20px",
        },
    },
    newsContainer: {
        display: {
            md: "flex",
            xs: "none",
        },
    },
    news: {
        display: {
            md: "flex",
            xs: "none",
        },

        flexDirection: "column",
        justifyContent: "space-between",
        "& .MuiGrid-root": {
            width: {
                md: "100%",
                "& h2": {
                    fontSize: "15px",
                    fontWeight: "400",
                },
                "& a": {
                    fontSize: "12px",
                    fontStyle: "italic",
                },
                "& .decoration": {
                    left: "0",
                },
            },
        },
        "& .MuiTypography-root": {
            justifyContent: "flex-start",
        },
    },
}
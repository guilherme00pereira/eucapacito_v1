import {useState, useEffect} from "react";
import apiService from "../../services/apiService";
import {Box, Stack, CircularProgress} from "@mui/material";
import NewsPost from "./NewsPost";
import {loading} from "../../commonStyles/loading";

const BlogSidebar = ({ tags }) => {
    const {api} = apiService;
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        api.get('/wp/v2/posts?per_page=4&order=desc&orderby=date')
            .then((res) => {
                const fetchedPosts = [];
                res.data.forEach((post) => {
                    const newPost = {
                        id: post.id,
                        title: post.title.rendered,
                        slug: post.slug,
                        image_url: post.featured_image_src
                    }
                    fetchedPosts.push(newPost);
                })
                setPosts([...fetchedPosts]);
                setIsLoading(false);
            })
    }, [])
    return (
        <Stack sx={styles.sideColumn}>
            <Stack sx={styles.newsContainer}>
                <h3>Últimas notícias</h3>
                {isLoading && <CircularProgress sx={loading.circular}/>}
                {!isLoading && (
                    <Box container sx={styles.news}>
                        {posts.length > 0 &&
                            posts.map((post) => (
                                <NewsPost key={post.id} post={post}/>
                            ))
                        }
                    </Box>
                )}
            </Stack>
            <Box>
                <h3>Tags</h3>
                {tags.map((tag) => (<div>{tag}</div>))}
            </Box>
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
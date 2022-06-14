import {useState, useEffect} from "react";
import apiService from "../../services/apiService";
import {Box, CircularProgress} from "@mui/material";
import NewsPost from "./NewsPost";
import {loading} from "../../commonStyles/loading";

const BlogSidebar = () => {
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
                setPosts([...posts, ...fetchedPosts]);
                setIsLoading(false);
            })
    }, [])
    return (
        <Box sx={styles.newsContainer}>
            <p>Últimas notícias</p>
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
        </Box>

    );
};

export default BlogSidebar;

const styles = {
    newsContainer: {
        display: {
            md: "block",
            xs: "none",
        },
        margin: "0 auto 130px auto",
        position: "absolute",
        top: "3%",
        left: "105%",
        width: "57%",
        "& p": {
            textTransform: "uppercase",
            color: "#33EDAC",
            fontWeight: "400",
            fontSize: "18px",
            mt: "20px",
        },
        borderLeft: "1px solid #77837F",
        pl: "20px",
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
import {useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import apiService from "../services/apiService";
import Button from "../components/Button";
import BlogPost from "../components/Content/BlogPost";
import UpdateForm from "../components/Content/UpdateForm";

import { postListStyles } from '../commonStyles/postListStyles'

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
    const {api} = apiService;

    const handleLoadMore = () => {
        if (!hideLoadMoreButton) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        api.get(`/wp/v2/posts?per_page=12&page=${page}`)
            .then((res) => {
                if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
                    setHideLoadMoreButton(true);
                }
                const fetchedBlogs = [];
                res.data.forEach((blog) => {
                    const newBlog = {
                        id: blog.id,
                        slug: blog.slug,
                        featuredImg: blog.featured_image_src,
                        title: blog.title.rendered,
                        excerpt: blog.excerpt.rendered,
                        date: new Date(blog.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }),
                        categories: blog.categories_object
                            .map((category) => category.name)
                            .join(", "),
                    }
                    fetchedBlogs.push(newBlog);
                });
                setBlogs([ ...blogs, ...fetchedBlogs]);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                return false;
            });
    }, [page]);

    return (
        <Box sx={postListStyles.root}>
            <h1>Blog</h1>
            <hr />
            <Box sx={postListStyles.tabPanelBox}>
                {blogs.length > 0 &&
                    blogs.map((blog) => (
                        <BlogPost blog={blog} sxFull={postListStyles.postItem} />
                    ))}
            </Box>
            {isLoading && <CircularProgress sx={postListStyles.loading}/>}
            {!isLoading && (
                <Button
                    sx={hideLoadMoreButton ? hideLoadMoreButton : postListStyles.loadMoreButton}
                    onClick={handleLoadMore}>
                    Ver mais
                </Button>
            )}
            <hr />
            <UpdateForm />
        </Box>
    )
}

export default Blogs;


import {useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import apiService from "../../../src/services/apiService";
import Button from "../../../src/components/Button";
import BlogPost from "../../../src/components/Content/BlogPost";
import { postListStyles } from '../../../src/commonStyles/postListStyles';
import {loading} from "../../../src/commonStyles/loading";
import { capitalizeFirstLetterSlug } from '../../../src/services/helper'
import {useRouter} from "next/router";

const Tag = () => {
    const router = useRouter()
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [tagTitle, setTagTitle] = useState("")
    const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
    const {api} = apiService;

    const handleLoadMore = () => {
        if (!hideLoadMoreButton) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if(router.isReady) {
            setTagTitle(capitalizeFirstLetterSlug(router.query.slug))

            setIsLoading(true);
            api.get(`/wp/v2/posts?tags=${router.query.id}&per_page=12&page=${page}`)
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
                    setBlogs([...blogs, ...fetchedBlogs]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    return false;
                });
        }
    }, [page]);

    return (
        <Box sx={postListStyles.root}>
            <h1>{ tagTitle }</h1>
            <hr />
            <Box sx={postListStyles.tabPanelBox}>
                {blogs.length > 0 &&
                    blogs.map((blog) => (
                        <BlogPost key={blog.id} blog={blog} sxFull={postListStyles.postItem} />
                    ))}
            </Box>
            {isLoading && <CircularProgress sx={loading.circular}/>}
            {!isLoading && (
                <Button
                    sx={hideLoadMoreButton ? hideLoadMoreButton : postListStyles.loadMoreButton}
                    onClick={handleLoadMore}>
                    Ver mais
                </Button>
            )}
        </Box>
    );
};

export default Tag;
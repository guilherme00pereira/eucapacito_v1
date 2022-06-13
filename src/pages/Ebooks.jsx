import {useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";

import apiService from "../services/apiService";
import Button from "../components/Button";
import EbookPost from "../components/Content/EbookPost";
import UpdateForm from "../components/Content/UpdateForm";

import { postListStyles } from '../commonStyles/postListStyles'

const Ebooks = () => {
    const [ebooks, setEbooks] = useState([]);
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
        api.get(`/wp/v2/ebooks?per_page=12&page=${page}`)
            .then((res) => {
                if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
                    setHideLoadMoreButton(true);
                }
                const fetchedEbooks = [];
                res.data.forEach((ebook) => {
                    const newEbook = {
                        id: ebook.id,
                        slug: ebook.slug,
                        featuredImg: ebook.featured_image_src,
                        title: ebook.title.rendered,
                        content: ebook.content.rendered,
                        excerpt: ebook.excerpt.rendered,
                        date: new Date(ebook.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }),
                        download: ebook.arquivo.guid,
                    }
                    fetchedEbooks.push(newEbook);
                });
                setEbooks([ ...ebooks, ...fetchedEbooks]);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                return false;
            });
    }, [page]);

    return (
        <Box sx={postListStyles.root}>
            <h1>Ebook</h1>
            <hr />
            <Box sx={postListStyles.tabPanelBox}>
                {ebooks.length > 0 &&
                    ebooks.map((ebook) => (
                        <EbookPost ebook={ebook} sxFull={postListStyles.postItem} />
                    ))}
            </Box>
            {isLoading && <CircularProgress sx={postListStyles.loading}/>}
            {!isLoading && (
                <Box sx={postListStyles.loadMoreButtonBox}>
                    <Button
                        sx={hideLoadMoreButton ? hideLoadMoreButton : postListStyles.loadMoreButton}
                        onClick={handleLoadMore}>
                        Ver mais
                    </Button>
                </Box>
            )}
            <hr />
            <UpdateForm />
        </Box>
    );
};

export default Ebooks;




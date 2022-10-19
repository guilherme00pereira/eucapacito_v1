import {useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import apiService from "../src/services/apiService";
import Button from "../src/components/Button";
import EbookPost from "../src/components/Content/EbookPost";
import UpdateForm from "../src/components/Content/UpdateForm";
import { postListStyles } from '../src/commonStyles/postListStyles';
import {loading} from "../src/commonStyles/loading";
import SEO from '../src/seo'

const Ebooks = ({ metadata }) => {
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
            <SEO metadata={metadata} />
            <h1>Ebook</h1>
            <hr />
            <Box sx={postListStyles.tabPanelBox}>
                {ebooks.length > 0 &&
                    ebooks.map((ebook) => (
                        <EbookPost ebook={ebook} sxFull={postListStyles.postItem} />
                    ))}
            </Box>
            {isLoading && <CircularProgress sx={loading.circular}/>}
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

export async function getStaticProps() {
    const {api}     = apiService;
    const res       = await api.get("/wp/v2/pages/" + process.env.PAGE_EBOOKS)
    const metadata  = {
          title: res.data.yoast_head_json.og_title,
          description: res.data.yoast_head_json.description,
          og_title: res.data.yoast_head_json.og_title,
          og_description: res.data.yoast_head_json.og_description,
          article_modified_time: res.data.yoast_head_json.article_modified_time ?? null,
        og_url: res.data.yoast_head_json.og_url.replace('wp.eucapacito', 'www.eucapacito'),
        canonical: res.data.yoast_head_json.canonical.replace('wp.eucapacito', 'www.eucapacito')
        }
    return { props: { metadata }}
  }

export default Ebooks;




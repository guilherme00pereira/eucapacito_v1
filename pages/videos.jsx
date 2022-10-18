import {useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import apiService from "../src/services/apiService";
import Button from "../src/components/Button";
import VideoPost from "../src/components/Content/VideoPost";
import UpdateForm from "../src/components/Content/UpdateForm";
import { postListStyles } from '../src/commonStyles/postListStyles';
import {loading} from "../src/commonStyles/loading";
import SEO from '../src/seo'

const Videos = ({ metadata }) => {
    const [videos, setVideos] = useState([]);
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
        api.get(`/wp/v2/video?per_page=12&page=${page}`)
            .then((res) => {
                if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
                    setHideLoadMoreButton(true);
                }
                const fetchedVideos = [];
                res.data.forEach((video) => {
                    const newVideo = {
                        id: video.id,
                        title: video.title.rendered,
                        excerpt: video.excerpt.rendered,
                        featuredImg: video.featured_image_src,
                        youtubeURL: video.youtube_url,
                        slug: video.slug,
                    }
                    fetchedVideos.push(newVideo);
                });
                setVideos([ ...videos, ...fetchedVideos]);
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

            <h1>Vídeos</h1>
            <hr />
            <Box sx={postListStyles.tabPanelBox}>
                {videos.length > 0 &&
                    videos.map((video) => (
                        <VideoPost video={video} sxFull={postListStyles.postItem} />
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
    const res       = await api.get("/wp/v2/pages/" + process.env.PAGE_VIDEOS)
    const metadata  = {
          title: res.data.yoast_head_json.og_title,
          description: res.data.yoast_head_json.description,
          og_title: res.data.yoast_head_json.og_title,
          og_description: res.data.yoast_head_json.og_description,
          article_modified_time: res.data.yoast_head_json.article_modified_time ?? null
        }
    return { props: { metadata }}
  }

export default Videos;
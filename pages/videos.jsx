import {useState, useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";

import apiService from "../services/apiService";
import Button from "../components/Button";
import VideoPost from "../components/Content/VideoPost";
import UpdateForm from "../components/Content/UpdateForm";

import { postListStyles } from '../commonStyles/postListStyles';
import {loading} from "../commonStyles/loading";
import MetadataManager from "../layouts/MetadataManager";


const Videos = () => {
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
            <MetadataManager ispage={true} value="videos" />
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

export default Videos;
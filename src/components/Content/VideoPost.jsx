import { Box } from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import Link from "../Link";

const VideoPost = ({ video }) => {
  return (
    <Box sx={styles.post}>
      <h2>{video.title}</h2>

      <Link to={`/video/${video.slug}/${video.id}`}>
        <div className="image">
          <img src={video.featuredImg} alt="Video Placeholder" />
          <PlayCircleOutline sx={styles.post.playIcon} />
        </div>
      </Link>
    </Box>
  );
};

export default VideoPost;

const styles = {
  post: {
    h2: {
      color: "#CAC8C8",
      fontSize: "0.8rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      textTransform: "uppercase",
      minHeight: "72px",
    },
    "& .image": {
      position: "relative",
      zIndex: 5,
    },
    img: {
      width: "100%",
      height: "240px",
      borderRadius: "8px",
    },
    playIcon: {
      display: "flex",
      position: "absolute",
      top: "calc(50% - 40px)",
      left: "calc(50% - 40px)",
      color: "#FFFFFF",
      fontSize: "80px",
    },
  },
};

import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import parse from "html-react-parser";
import apiService from "../services/apiService";

const Video = () => {
  const [title, setTitle] = useOutletContext();
  const [video, setVideo] = useState({
    title: "",
    description: "",
    embedURL: "",
  });

  const { api } = apiService;
  const { slug } = useParams();

  useEffect(() => {
    setTitle({
      main: "Vídeo",
      sub: false,
    });

    api.get(`/wp/v2/video?slug=${slug}&_embed`).then((res) => {
      const videoData = res.data[0];

      setVideo({
        title: parse(videoData.title.rendered),
        description: parse(videoData.content.rendered),
      });
    });
  }, []);

  return (
    <Box sx={styles.root}>
      <h1 className="title">{video.title}</h1>
      <div className="description">{video.description}</div>
    </Box>
  );
};

export default Video;

const styles = {
  root: {
    textAlign: "center",
    "& .title": {
      my: "4.5rem",
      color: "#CAC8C8",
      fontSize: "2rem",
      fontWeight: 500,
    },
    "& .description": {
      color: "#77837F",
      fontWeight: 600,
      textAlign: "left",
      lineHeight: "2rem",
      "& p:last-of-type": {
        mt: "4.5rem",
        textAlign: "center",
      },
      "& iframe": {
        maxWidth: "100%",
      },
    },
  },
};

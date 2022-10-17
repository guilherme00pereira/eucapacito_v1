import {useState, useEffect, useContext} from "react";
import {Box} from "@mui/material";
import BlogPost from "../src/components/Content/BlogPost";
import VideoPost from "../src/components/Content/VideoPost";
import EbookPost from "../src/components/Content/EbookPost";
import UpdateForm from "../src/components/Content/UpdateForm";
import ContentTitle from "../src/components/Content/ContentTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import {swiper} from "../src/commonStyles/swiper";
import apiService from "../src/services/apiService";
import {AppContext} from "../src/services/context";

const Conteudo = ({blogs, videos, ebooks}) => {
  const ctx = useContext(AppContext);

  const { root, blog } = styles;

  useEffect(() => {
    ctx.setTitle({
      main: "Conteúdo",
      sub: "Leia o conteúdo da semana",
    })
  }, []);

  return (
    <Box sx={root}>

      <Box sx={blog}>
        <ContentTitle title="Blog" to={'/blog'} linkText="Todos os posts" />
          <Swiper
            className="mySwiper"
            breakpoints={swiper.breakpoints}
            slidesPerView={1}
            autoplay={swiper.autoplay}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
          >
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogPost blog={blog} sxFull={styles.blog.box} />
                </SwiperSlide>
              ))}
          </Swiper>
        
      </Box>

      <Box sx={styles.videos}>
        <ContentTitle title="Vídeos" to={'/videos'} linkText="Todos os vídeos" />
        <Swiper
          className="mySwiper"
          breakpoints={swiper.breakpoints}
          slidesPerView={1.15}
          spaceBetween={15}
          autoplay={swiper.autoplay}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
        >
          {videos.length > 0 &&
            videos.map((video) => (
              <SwiperSlide key={video.id}>
                <VideoPost video={video} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>

      <Box sx={styles.ebook}>
        <ContentTitle title="Ebook" to={'/ebooks'} linkText="Todos os ebooks" />
        <Swiper
          className="mySwiper"
          breakpoints={swiper.breakpoints}
          slidesPerView={1}
          autoplay={swiper.autoplay}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
        >
          {ebooks.length > 0 &&
            ebooks.map((ebook) => (
              <SwiperSlide key={ebook.id}>
                <EbookPost ebook={ebook} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>

      <UpdateForm />

    </Box>
  );
};

export async function getServerSideProps() {
  const {api}   = apiService;

  // Blogs
  const blogs   = []
  let res       = await api.get(`/wp/v2/posts?per_page=12`)
  let items     = res.data
  items.forEach((blog) => {
    blogs.push({
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
    });
  });

  // Videos
  const videos  = []
  res           = await api.get(`/wp/v2/video?per_page=6`)
  items         = res.data
  items.forEach((video) => {
    videos.push({
      id: video.id,
      title: video.title.rendered,
      excerpt: video.excerpt.rendered,
      featuredImg: video.featured_image_src,
      youtubeURL: video.youtube_url,
      slug: video.slug,
    })
  });

  // E-Books
  const ebooks  = []
  res           = await api.get(`/wp/v2/ebooks?per_page=12`)
  items         = res.data
  items.forEach((ebook) => {
    ebooks.push({
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
    })
  });

  return { props: { blogs, videos, ebooks }}

}

export default Conteudo;


const styles = {
  root: {
    h1: { marginTop: "2rem", fontSize: "20px", color: "#CAC8C8" },
    hr: { border: 0, borderTop: "1px solid #77837F" },
    //css desktop
    "& .swiper-container": {
      width: "100%",
    },
    "& .mySwiper": {
      // width: "92%",
    },
    "& .swiper-button-next:after": {
      display: {
        xs: "none",
        md: "block",
      },
      fontSize: "20px",
      fontWeight: "bold",
      color: "#33EDAC",
    },
    "& .swiper-button-prev:after": {
      display: {
        xs: "none",
        md: "block",
      },
      fontSize: "20px",
      fontWeight: "bold",
      color: "#33EDAC",
    },
    "& .swiper-pagination-bullet": {
      background: "#33EDAC",
    },
    "& .swiper-pagination-bullet-active": {
      background: "#33EDAC",
    },
    "& .swiper-slide": {
      mb: {
        xs: "50px",
        md: "50px",
      },
    },
  },
  blog: {
    "& h1":{
        fontSize:{
            md:"22px",
            xs:"16px"
        }
    },
    width: "100%",
    position: "relative",
    "& h2": {
      fontSize: "10px !important",
      fontWeight: "400 !important",
      lineHeight: "20px !important",
    },
    "& div": {
      fontSize: "10px",
      fontWeight: "400",
    },
    // "& a": {
    //   fontSize: "10px !important",
    // },
    "& .MuiSvgIcon-root": {
      width: "12px",
    },
    box: {
      width: {
        md: "342px",
        xs: "100%"
      }
    }
  },
  ebook: {
      "& h1":{
          fontSize:{
              md:"22px",
              xs:"16px"
          }
      },
    "& h2": {
      fontSize: {
        md: "10px !important",
        xs: "10px",
      },
      fontWeight: {
        xs: "400",
        md: "400",
      },
      lineHeight: {
        md: "20px !important",
        xs: "1.5rem",
      },
    },
    "& p": {
      fontSize: {
        xs: "10px",
        md: "10px",
      },
      lineHeight: {
        xs: "20px",
        md: "20px",
      },
    },
    "& a": {
      fontSize: {
        xs: "6px",
        md: "6px !important",
      },
      fontStyle: "italic",
      fontWeight: "500",
    },
    "& .MuiBox-root p:last-child": {
      fontSize: {
        xs: "0.75rem",
        md: "7px",
      },
    },
  },
  videos: {
    "& h1":{
        fontSize:{
            md:"22px",
            xs:"16px"
        }
    },
    "h1+hr": {
      mb: 4,
    },
    "& h2": {
      fontSize: {
        xs: "10px",
        md: "12px !important",
      },
      fontWeight: "400",
      lineHeight: {
        xs: "1.5rem",
        md: "20px !important",
      },
      minHeight: {
        md: "40px !important",
        xs: "auto",
      },
      "& img:hover": {
        boxShadow: "0px 0px 10px 5px #33EDAC",
        borderRadius: "10px",
      },
    },

  },
};

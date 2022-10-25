import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import {Box} from "@mui/material";
import {swiper} from "../../commonStyles/swiper";
import BannerLink from "./BannerLink";
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

const Banners = ({ banners }) => {

    return (
        <Box sx={styles.banners}>
            <Swiper
                className="mySwiper"
                autoplay={swiper.autoplay}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
            >
                {banners.length > 0 &&
                    banners.map((banner, index) => (
                        <SwiperSlide key={index} className={banner.deviceClass}>
                            <BannerLink to={banner.link}>
                                {
                                    banner.type === 'video' ?
                                        <ReactPlayer url={banner.link}/> :
                                        <Image src={banner.image} alt="Banner" width="1100" height="450" />
                                }
                            </BannerLink>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    );
};

export default Banners;

const styles = {
    banners: {
        mb: "2rem",
        "& img": {
            maxWidth: "100%",
        },
        '& .swiper-wrapper': {
            alignItems: "center"
        },
        "& .swiper-slide": {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        "& .bannerDesk": {
            display: {
                md: "flex",
                xs: "none",
            }
        },
        "& .bannerMobile": {
            display: {
                md: "none",
                xs: "flex",
            },
        },
    },
}
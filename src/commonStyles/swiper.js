export const swiper = {
    autoplay: {
        delay: 4000,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        900: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    pagination: {
        "& .swiper-pagination-bullet": {
            background: "#33EDAC",
          },
          "& .swiper-pagination-bullet-active": {
            background: "#33EDAC",
          },
          "& .swiper-slide": {
            mb: {
              xs: "0",
              md: "50px",
            },
          },
    }
}
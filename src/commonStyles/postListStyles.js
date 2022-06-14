export const postListStyles = {
    postItem: {
        width: {
            xs: "calc(100% - 2%)",
            md: "calc(100% / 3 - 2%)",
        },
        m: "10px 1%",
    },
    root: {
        h1: { marginTop: "2rem", fontSize: "22px", color: "#CAC8C8", textAlign: "center" },
        hr: { border: 0, borderTop: "1px solid #77837F" },
    },
    tabPanelBox: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    hideLoadMoreButton: {
        display: "none",
    },
    loadMoreButtonBox: {
        display: "flex",
        justifyContent: "center",
        margin: "0 auto 48px",
    },
    loadMoreButton: {
        display: "block",
        margin: "0 auto 3rem",
    },
};
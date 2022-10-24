import {useEffect, useContext} from "react";
import {Box, Stack} from "@mui/material";
import Link from "../src/components/Link";
import parse from "html-react-parser";
import apiService from "../src/services/apiService";
import BlogSidebar from "../src/components/Content/BlogSidebar";
import { AppContext } from "../src/services/context";
import SEO from '../src/seo'
import {extractYoastData} from "../src/services/helper";

const DynamicBlog = ({blog, posts}) => {
    const ctx = useContext(AppContext);

    useEffect(() => {
        // if(slug === 'pesquisa-de-satisfacao') {
        //     window.location.href = "";
        // }
        ctx.setTitle({
            main: "Blog",
            sub: "Leia o conteúdo da semana",
        });
    }, []);

    return (
        <>
            {blog.yoast &&
               <SEO metadata={extractYoastData(blog.yoast)} />
            }
            <Stack sx={styles.root}>
                <Box sx={styles.titlepage}>
                    <h1>Blog</h1>
                </Box>
                <Stack direction={{md: "row", xs: "column"}} justifyContent="">
                    <Box sx={styles.mainColumn}>
                        <Box sx={styles.image}>
                            <img src={blog.featuredImg} alt="Placeholder Blog"/>
                        </Box>
                        <Box sx={styles.content}>
                            <Box sx={styles.content.info}>
                                <small>{blog.date}</small>
                                <small>{blog.cats}</small>
                            </Box>
                            <hr/>
                            <h1>{parse(blog.title)}</h1>
                            <div className="content">
                                {parse(blog.content)}
                            </div>
                        </Box>
                        <Stack sx={styles.tags}>
                            <h3>TAGS:</h3>
                            <Stack direction="row" sx={styles.tagRow}>
                                { blog.tags.map( (tag) => 
                                    <Box sx={styles.tagBadge}>
                                        <Link to={`/tag/${tag.slug}/${tag.id}`}>
                                            {tag.name}
                                        </Link>
                                    </Box> 
                                ) }
                            </Stack>
                        </Stack>
                    </Box>
                    <BlogSidebar posts={posts} />
                </Stack>
            </Stack>
        </>
    );
};

export async function getStaticPaths() {
    const {api}     = apiService;
    const res       = await api.get('eucapacito/v1/blog-slugs')
    const slugs     = res.data
    const paths     = slugs.map(slug => ({
        params: { slug: slug }
    }))
    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const {api}     = apiService;
    
    let res       = await api.get(`/wp/v2/posts?slug=${params.slug}&_embed`)
    const blogData  = res.data[0]
    const blog = {
        featuredImg: blogData.featured_image_src,
        title: blogData.title.rendered,
        content: blogData.content.rendered,
        date: new Date(blogData.date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }),
        cats: blogData.categories_object ? blogData.categories_object
            .map((category) => category.name)
            .join(", ") : [],
        tags:  blogData.tag_object ? blogData.tag_object.map((tag) => ({
            name: tag.name,
            slug: tag.slug,
            id: tag.term_id
        })) : [],
        yoast: blogData.yoast_head_json
    }

    const posts     = []
    res             = await api.get('/wp/v2/posts?per_page=4&order=desc&orderby=date')
    const items     = res.data
    items.forEach(item => {
        posts.push({
            id: item.id,
            title: item.title.rendered,
            slug: item.slug,
            image_url: item.featured_image_src
        });
    })

    return { props: { blog, posts }}
}

export default DynamicBlog;

const styles = {
    root: {
        "h1, h2": {
            color: "#CAC8C8",
            fontWeight: 500,
            textTransform: "uppercase",
        },
    },
    mainColumn: {
        flex: "2",
        mr: "50px",
        mt: "20px"
    },
    image: {
        img: {
            width: "calc(100% + 32px)",
            height: "262px",
            position: "relative",
            left: {
                md: "-16px",
                xs: "0px"
            },
            zIndex: -1,
            objectFit: {
                md: "cover",
                xs: "contain"
            },
        },
        pl: {
            xs: "0",
            md: "50px",
        },
    },
    content: {
        info: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "0.75rem",
            small: {
                color: "#77837F",
                fontSize: {md: "16px", xs: "6px"},
                fontWeight: 400,
                "&+small": {
                    textTransform: "uppercase",
                    textAlign: "right",
                    maxWidth: {
                        md: "50%",
                        xs: "100%",
                    },
                },
            },
            pl: {
                xs: "0",
                md: "35px",
            },
        },
        hr: {
            m: {
                md: "1rem 0 1.5rem 1.5rem",
                xs: "1rem 0 1.5rem",
            },
            border: 0,
            borderTop: "1px solid #77837F",
        },
        h1: {
            fontSize: {
                xs: "18px",
                md: "26px",
            },
            pl: {
                xs: "0",
                md: "35px",
            },
        },
        h2: {
            fontSize: "0.8rem",
            pl: {
                xs: "16",
                md: "35px",
            },
        },
        "& .content": {
            color: "#77837F",
            fontSize: {xs: "14px", md: "18px"},
            fontStyle: {
                md: "normal",
                xs: "italic",
            },
            fontWeight: 500,
            textAlign: "justify",
            lineHeight: "1.5rem",
            pl: {
                xs: "0",
                md: "35px",
            },
        },
        "& p+h2": {
            mt: "1rem",
        },
    },
    titlepage: {
        display: {
            xs: "none",
            md: "block",
        },
        mt: "46px",
        h1: {
            fontWeight: "700",
            textTransform: "none",
            borderBottom: "1px solid #77837F",
            pb: "13px",
        },
    },
    tags: {
        fontStyle: "italic",
        borderLeft: "1px solid #77837F",
        pl: "20px",
        h3: {
            fontSize: {
                md: "1.25em",
                xs: "1em"
            },
        },
    },
    tagRow: {
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    tagBadge: {
        border: "1px solid #77837F",
        borderRadius: "0.5rem",
        padding: "5px",
        margin: "5px",
        fontSize: {
            md: "1em",
            xs: "0.875em"
        },
    }
};

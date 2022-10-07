import {useContext, useEffect} from "react";
import apiService from "../services/apiService";
import {MetadataContext} from '../services/context';

const MetadataManager = ({ispage, value}) => {
    const setHeaderMetadata = useContext(MetadataContext)
    const {api} = apiService
    useEffect(() => {
        if (ispage) {
            if(value === 'default'){
                setHeaderMetadata({
                    title: "Eu Capacito",
                    description: "",
                    og_title: "",
                    og_description: "",
                    article_modified_time: ""
                })
            } else {
                if (sessionStorage.getItem('pages_metadata') !== null) {
                    const page = extractPageId(value)
                    api.get("/wp/v2/pages/" + page).then((res) => {
                        setHeaderMetadata({
                            title: res.data.yoast_head_json.og_title,
                            description: res.data.yoast_head_json.description,
                            og_title: res.data.yoast_head_json.og_title,
                            og_description: res.data.yoast_head_json.og_description,
                            article_modified_time: res.data.yoast_head_json.article_modified_time
                        })
                    });
                }
            }
        } else {
            setHeaderMetadata({
                title: value.og_title,
                description: value.description,
                og_title: value.og_title,
                og_description: value.og_description,
                article_modified_time: value.article_modified_time
            })
        }
    }, []);
}

export default MetadataManager;

const extractPageId = (key) => {
    const pages = JSON.parse(sessionStorage.getItem("pages_metadata"))
    const filtered = pages.find(obj => {
        return obj.key === key
    })
    if (typeof filtered === 'undefined') {
        return "6208"
    } else {
        return filtered.wp_id
    }
}

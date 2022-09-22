import apiService from "../services/apiService";

export const metadataManager = ( url, handler ) => {
    const { api } = apiService
    api.get(url).then( (res) => {
        console.log( res.data )
        handler({
            title: res.data.yoast_head_json.og_title,
            description: res.data.yoast_head_json.description,
            og_title: res.data.yoast_head_json.og_title,
            og_description: res.data.yoast_head_json.og_description,
            article_modified_time: res.data.yoast_head_json.article_modified_time
        })    
    });
}
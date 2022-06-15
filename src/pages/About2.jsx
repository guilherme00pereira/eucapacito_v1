import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import apiService from "../services/apiService";

const About2 = () => {
    const [title, setTitle] = useOutletContext();
    const [content, setContent] = useState('');
    const {api} = apiService;

    useEffect(() => {
      setTitle({
        main: "Quem Somos",
        sub: "Saiba mais sobre",
      });

      api.get('/eucapacito/v1/aboutpage').then( (res) => {
        setContent(res.data);
      })
    }, []);
  
    return (
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    );

}

export default About2;
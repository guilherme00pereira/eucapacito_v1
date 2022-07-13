import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

const Certification = () => {
    const [certificate, setCertificate] = useState({});
    const { id } = useParams();
    const { api } = apiService;

    useEffect(() => {
        api.get(`/eucapacito/v1/get-certificate/${id}`).then((res) => {
            console.log(res.data)
        })
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default Certification;
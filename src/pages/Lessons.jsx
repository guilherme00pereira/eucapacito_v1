import {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import apiService from "../services/apiService";
import parse from "html-react-parser";

const Lessons = () => {
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");
    const {api} = apiService;
    const {id} = useParams();

    useEffect(() => {
        api.get(`/ldlms/v1/sfwd-lessons?course=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            console.log(res.data)
            setIsLoading(false);
        });
    }, [api]);

    return (
        <div>

        </div>
    );
};

export default Lessons;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Button from "../components/Button";
import apiService from "../services/apiService";


const Quizz = () => {
    const { api } = apiService;
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        api.get(`/ldlms/v2/users/52286/quiz-progress?quiz=9841&course=10730`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            console.log(res.data)
        });
    }, []);


    return (
        <div>
            
        </div>
    );
};

export default Quizz;
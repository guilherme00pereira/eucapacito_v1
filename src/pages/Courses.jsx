import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import apiService from "../services/apiService";
import {loading} from "../commonStyles/loading"
import Button from "../components/Button";
import CourseCard from "../components/Course/CourseCard";

const Courses = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("1");
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
  const [title, setTitle] = useOutletContext();

  let navigate = useNavigate();

  const { api } = apiService;

  const handleLoadMore = () => {
    if (!hideLoadMoreButton) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    token
      ? setTitle({
          main: "Meus Cursos",
          sub: false,
        })
      : setTitle({
          main: "Cursos",
          sub: false,
        });

    setIsLoading(true);

    api.get(`/wp/v2/curso_ec?_embed&per_page=12&page=${page}`)
      .then((res) => {
        if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
          setHideLoadMoreButton(true);
        }

        const fetchedCourses = [];

        res.data.forEach((course) => {
          const newCourse = {
            id: course.id,
            slug: course.slug,
            featuredImg: course["featured_image_src"],
            title: course.title.rendered,
            subtitle: "Eu Capacito",
            partnerLogoURL: course.responsavel.guid,
          };

          fetchedCourses.push(newCourse);
        });

        setCourses([...courses, ...fetchedCourses]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        return false;
      });
  }, [navigate, tab, token, page]);

  return (
    <>
      <Box sx={styles.tabPanelBox}>
        {courses.length > 0 &&
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </Box>
      {isLoading && <CircularProgress sx={loading.circular} />}
      {!isLoading && (
        <Button
          sx={
            hideLoadMoreButton
              ? styles.hideLoadMoreButton
              : styles.loadMoreButton
          }
          onClick={handleLoadMore}
        >
          Ver mais
        </Button>
      )}
    </>
  );
};

export default Courses;

const styles = {
 tabPanelBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  hideLoadMoreButton: {
    display: "none",
  },
  loadMoreButton: {
    display: "block",
    margin: "0 auto 3rem",
  }
};

import { useState, useEffect, useContext } from "react";
import { Box, CircularProgress } from "@mui/material";
import apiService from "../services/apiService";
import Jornadas from "../components/Jornadas";
import Button from "../components/Button";
import CourseBox from "../components/Search/CourseBox";
import { SearchContext } from "../contexts/SearchContext";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
  const { search, setSearch } = useContext(SearchContext);

  const { api } = apiService;

  // const [searchParams] = useSearchParams();
  // const [searchTerm, setSearchTerm] = useState(searchParams.get("search"));

  const handleLoadMore = () => {
    if (!hideLoadMoreButton) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    setCourses([]);

    setIsLoading(true);

    api
      .get(`/wp/v2/curso_ec?_embed&per_page=15&page=${page}&search=${search}`)
      .then((res) => {
        if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
          setHideLoadMoreButton(true);
        }

        const fetchedCourses = [];

        res.data.forEach((course) => {
          const newCourse = {
            id: course.id,
            slug: course.slug,
            title: course.title.rendered,
            subtitle: course.type === "curso_ec" ? "Eu Capacito" : "Parceiro",
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
  }, [page]);

  return (
    <Box sx={styles.root}>
      {courses.length === 0 ? (
        <p>Não foi encontrado cursos relacionados</p>
      ) : (
        <Box>
          <p>Resultados da pesquisa</p>

          {courses.map((course) => (
            <CourseBox
              key={course.id}
              courseId={course.id}
              slug={course.slug}
              title={course.title}
              company="Eu Capacito"
              logoURL={course.partnerLogoURL}
            />
          ))}

          {isLoading && <CircularProgress sx={styles.loading} />}
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
        </Box>
      )}
    </Box>
  );
};

export default Search;

const styles = {
  root: {
    "& p": {
      fontWeight: 500,
    },
  },
  hideLoadMoreButton: {
    display: "none",
    marginTop: "1.5rem",
  },
  loadMoreButton: {
    display: "block",
    margin: "1.5rem auto 0",
  },
  loading: {
    display: "flex",
    margin: "1.5rem auto 0",
    color: "#77837F",
  },
};

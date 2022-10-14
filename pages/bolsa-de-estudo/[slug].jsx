import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "../../src/components/Button";
import parse from "html-react-parser";
import ContentCard from "../../src/components/ContentCard";
import apiService from "../../src/services/apiService";
import {scholarshipStyle} from "../../src/commonStyles/scholarshipStyle";
import {useRouter} from "next/router";


const Scholarship = ({ scholarship, courses }) => {
  const router = useRouter()
  const [logged, setLogged] = useState(false);

  const handleCertificationUpload = () => {
    if(!logged) {
      router.push('/login')
    }
  }

  const handleStartForm = () => {
    if(!logged) {
      router.push('/login')
    } else {
      router.push(`/comece-agora/${router.params.slug}`)
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setLogged(!!token);
  }, []);


  return (
    <Box sx={scholarshipStyle.root}>
      <h1>Bolsas de Estudo</h1>
      <hr />

      <Box sx={scholarshipStyle.texto}>
        <Box sx={scholarshipStyle.description}>
          <h1>{scholarship.title}</h1>

          <p>{parse(scholarship.description)}</p>
        </Box>
      </Box>

      <h2>Para ajudar no seu processo, conclua o(s) seguinte(s) curso(s):</h2>

      <Box sx={scholarshipStyle.cardsContainer}>
        
          {courses.length > 0 && 
            courses.map((course) => (
              <Box key={course.id} sx={scholarshipStyle.card}>
                <ContentCard
                  url={course.url}
                  imagePath={course.featuredImg}
                  title={course.title}
                  subtitle={course.subtitle}
                  logoPath={course.partnerLogoURL}
                />
              </Box>
            ))
          }
          
        <Box sx={scholarshipStyle.certificado}>
          <Button onClick={handleCertificationUpload}>Envie os certificados</Button>
          <input type="file" />
          <input type="file" />
          <p>
            Finalizando os cursos anexar nos campos correspondentes e comece o
            processo seletivo clicando em "comece agora”.
          </p>
        </Box>
      </Box>

      <Box sx={scholarshipStyle.button}>
        <Button onClick={handleStartForm}>Comece agora!</Button>
      </Box>

    </Box>
  );
};

export async function getServerSideProps(context) {
  const {api}   = apiService;

  const courses = []
  let res       = await api.get(`/wp/v2/bolsa_de_estudo?slug=${context.params.slug}&_embed`)
  let item      = res.data[0]
  console.log(item)
  const scholarshipData = {
    featuredImg: item.iamge ? item.imagem.guid : null,
    title: item.title.rendered,
    description: item.content.rendered,
    yoast: item.yoast_head_json
  }
  item.cursos_ec.forEach(course => {
    courses.push({
      id: course.id,
      url: course.url,
      featuredImg: course.image,
      title: course.title,
      subtitle: "Eu Capacito",
      partnerLogoURL: course.responsavel ?? null,
    })
  })

  return { props: { scholarshipData, courses }}
}

export default Scholarship;


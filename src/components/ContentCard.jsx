import { Box, Stack, Grid, Link } from "@mui/material";
import parse from "html-react-parser";



const CardContent = ({ imageUrl, title, subtitle, logoPath }) => {
  const logoPathAbsent = (typeof logoPath === 'undefined') || logoPath === false;
  return (
    <Box sx={styles.card}>
      <Box sx={styles.card.image}>
        {imageUrl === null ||
          <img src={imageUrl} alt={`Curso - ${title}`} />
        }
      </Box>

      <Stack display="flex" direction="row" justifyContent="space-between" sx={styles.card.info}>
        <>
          <Box className="desk-info">
            <p>{parse(`${title}`)}</p>
            <small>{parse(`${subtitle}`)}</small>
          </Box>
          {logoPathAbsent || (
            <Box sx={styles.card.partnerLogo}>
              <img src={logoPath} alt="Logo" />
            </Box>
          )}
        </>
      </Stack>
    </Box>
  )
}


const ContentCard = ({ url, imagePath, title, subtitle, logoPath }) => {


  return url.includes('http') ?
    <Link href={url || "#"} sx={{ color: "#33EDAC", textDecoration: "none" }} target="_blank">
      <CardContent imageUrl={imagePath} title={title} subtitle={subtitle} logoPath={logoPath} />
    </Link> :
    <Link href={url || "#"}>
      <CardContent imageUrl={imagePath} title={title} subtitle={subtitle} logoPath={logoPath} />
    </Link>;
};

export default ContentCard;

const styles = {
  card: {
    image: {
      height: "200px",
      overflow: "hidden",
      img: {
        borderRadius: "0.5rem",
        width: "100%",
        height: "100%",
      },
    },
    info: {
      border: "1px solid #77837f",
      boxSizing: "border-box",
      mt: "14px",
      borderRadius: "8px",
      padding: "33px",
      minHeight: "150px",
      mt: "0.75rem",
      "& p": {
        m: "0 0 0.125rem",
        color: "#CAC8C8",
        fontSize: "0.9rem",
      },
      small: {
        color: "#77837F",
        fontSize: "0.8rem",
      },
      img: {
        maxWidth: {
          md: "55px",
          xs: "39px",
        },
      },
      "& .desk-info": {
        maxWidth: "70%",
      },
    },
    partnerLogo: {
      with: "100px",
      height: "35px",
      boxShadow: "none",
    }
  },
};

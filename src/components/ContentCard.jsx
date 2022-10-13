import Image from 'next/image'
import {Box, Grid, Link} from "@mui/material";
import parse from "html-react-parser";

const CardContent = ({ imageUrl, title, subtitle, logoPath }) => {
  const logoPathAbsent = (typeof logoPath === 'undefined') || logoPath === false;
  return (
    <Box sx={styles.card}>
      <Box sx={styles.card.image}>
        <Image src={imageUrl} alt={`Curso - ${title}`} layout="fill"/>
      </Box>

      <Grid container sx={styles.card.info}>
        <Grid item className="desk-info">
          <p>{parse(`${title}`)}</p>
          <small>{parse(`${subtitle}`)}</small>
        </Grid>

        {logoPathAbsent ||
            <Grid item>
              <Image src={logoPath} alt="Logo" layout="fill"/>
            </Grid>
        }

      </Grid>
    </Box>
  )
}


const ContentCard = ({ url, imagePath, title, subtitle, logoPath }) => {


  return url.includes('http') ?
      <Link href={url || "#"} sx={{color: "#33EDAC", textDecoration: "none"}} target="_blank">
        <CardContent imageUrl={imagePath} title={title} subtitle={subtitle} logoPath={logoPath}/>
      </Link> :
      <Link href={url || "#"}>
        <CardContent imageUrl={imagePath} title={title} subtitle={subtitle} logoPath={logoPath}/>
      </Link>;
};

export default ContentCard;

const styles = {
  card: {
    image: {
      img: {
        borderRadius: "0.5rem",
        width: "100%",
        height: "200px",
      },
    },
    info: {
      mt: "0.75rem",
      justifyContent: "space-between",
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
  },
};

import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Gotham'",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#77837F",
          "& .MuiTypography-root": {
            fontWeight: 500,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "5px 9px",
          color: "#77837F",
          "&.Mui-checked": {
            color: "#33EDAC",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.75rem",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: "#CAC8C8",
          backgroundColor: "transparent",
          backgroundImage: "unset",
          boxShadow: "unset",
          borderBottom: "1px solid #77837F",
          "&.MuiAccordion-root:before": {
            backgroundColor: "unset",
          },
          "&:first-of-type": {
            borderTop: "1px solid #77837F",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
          "& h2": {
            margin: 0,
            fontSize: "1rem",
            fontWeight: 500,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          "&.Mui-expanded": {
            minHeight: "54px",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            color: "#77837F",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0.5rem 0 1rem",
        },
      },
    },
  },
});

export default Theme;

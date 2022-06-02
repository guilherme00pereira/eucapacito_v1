const formStyle = {
  root: {
    mb: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      m: 0,
      lineHeight: "1.5rem",
      textAlign: "center",
    },
    "& p:last-of-type": {
      mb: "1.25rem",
    },
  },
  grid: {
    width: "80%",
    label: {
      color: "#77837F",
      fontSize: "14px",
    },
    "&>.MuiGrid-item": {
      px: "0.5rem",
    },
  },
  gridCheckbox: {
    width: "100%",
    label: {
      mb: "1rem",
      color: "#CAC8C8",
      "& .MuiTypography-root": {
        fontSize: "0.9rem",
      },
    },
  },
  input: {
    "& .MuiOutlinedInput-input": {
      py: "5px",
      color: "#CAC8C8",
    },
    "& .MuiSelect-select": {
      py: "5px",
      color: "#CAC8C8",
    },
  },
};

export default formStyle;

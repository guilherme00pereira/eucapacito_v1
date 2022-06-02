import { Button as MuiButton } from "@mui/material";

const Button = ({
  children,
  to,
  href,
  disabled = false,
  target,
  onClick,
  onChange,
  sx,
}) => {
  const defaultSx = {
    boxShadow: "0px 16px 30px rgb(77 197 145 / 30%)",
    borderRadius: "10px",
    backgroundColor: "#33EDAC",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "500",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#2AB383",
    },
    ...sx,
  };

  return (
    <MuiButton
      variant="contained"
      to={to}
      href={href}
      disabled={disabled}
      target={target}
      onClick={onClick}
      onChange={onChange}
      sx={defaultSx}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

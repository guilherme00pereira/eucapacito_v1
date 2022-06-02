import { Box, Typography } from "@mui/material";

const Badge = ({ positionSx, sx, value }) => {
  return (
    <Box sx={{ ...styles.box, ...positionSx }}>
      <Typography component="p" sx={{ ...styles.badge, ...sx }}>
        { value }
      </Typography>
    </Box>
  );
};

export default Badge;

const styles = {
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    borderRadius: "1rem",
    padding: "0.25rem 0.75rem",
    width: "max-content",

    backgroundColor: "#33EDAC",
    color: "#FFFFFF",
    fontSize: "0.75rem",
  },
};

export const loginRegisterStyles = {
    container: {
        width: {
            sx: "100%",
            md: "60%",
        },
    },
    formControlPassword: { "& .MuiInputBase-root": { width: { xs: "100%", md: "60%" } } },
    formControlAction: {alignItems: "center", "& .MuiButton-root": {padding: {md: "6px 116px"}}},
    btnAction: {mt: 3, width: {sx: "100%", md: "60%"}},
    iconBorder: {
        marginRight: "16px",
        borderRight: "1px solid rgba(119, 131, 127, 0.6)",
        paddingRight: "12px",
        height: "32px",
    },
}
export const calculateTime = (v) => {
    v = parseInt(v, 10);
    if(isNaN(v)) {
        return "Não informado"
    }
    const h = Math.floor(v / 3600);
    const m = Math.floor((v - (h * 3600)) / 60);
    let text = h + " horas";
    if(m > 0) text += " e " + m + " minutos";
    return (text)
}

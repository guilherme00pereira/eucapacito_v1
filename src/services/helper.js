export const calculateTime = (v) => {
    v = parseInt(v, 10);
    if(isNaN(v)) {
        return "Não informado"
    }
    const h = Math.floor(v / 3600);
    const m = Math.floor((v - (h * 3600)) / 60);
    let text = h + (h === 1 ? " hora" : " horas");
    if(m > 0) text += " e " + m + (m === 1 ? " minuto" : " minutos");
    return (text)
}

export const formatDuration = (v) => {
    v = v.replace(/[^\d:]+/g, '')
    let text = "";
    const time = v.split(":");
    if(time[0] !== "00")
        text += time[0] + " horas"
    if(time[0] !== "00" && time[1] !== "00")
        text += " e "
    if(time[1] !== "00")
        text += time[1] + " minutos"
    return text;
}

export const genHash = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
}

export const capitalizeFirstLetterSlug = (str) => {
    str = str.replaceAll('-', ' ');
    const words = str.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

export const extractYoastData = (metadata) => {
    return {
        title: metadata.og_title,
        description: metadata.description,
        og_image: metadata.og_image ?? null,
        og_title: metadata.og_title,
        og_description: metadata.og_description,
        article_modified_time: metadata.article_modified_time ?? null,
        og_url: sanitizeYoastUrl(metadata.og_url),
        canonical: sanitizeYoastUrl(metadata.canonical)
    }
}

const sanitizeYoastUrl = (value) => {
    if(value.includes('172')) {
        return "https://www.eucapacito.com.br"
    }
    if(value.includes('wp.eucapacito')) {
        return value.replace('wp.eucapacito', 'www.eucapacito')
    }
    return value
}
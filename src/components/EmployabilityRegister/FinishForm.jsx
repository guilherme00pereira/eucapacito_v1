import {useEffect} from "react";
import Button from "../Button";


const FinishForm = ({form}) => {

    const handleSubmit = () => {
        console.log(form);
    }

    const telefone = `(${form.ddd}) ${form.phone}`;
    const data_nascimento = `${form.day}/${form.month}/${form.year}`

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
        script.async = true;
        document.body.appendChild(script);
        document.forms["comece-agora-data"].submit()
    }, [])

    return (
        <div>
            <form name="comece-agora-data" onSubmit={handleSubmit} style={{display: "none"}}>
                <input type="text" name={form.name} value={form.name}/>
                <input type="text" name={data_nascimento} value={data_nascimento}/>
                <input type="text" name={form.cpf} value={form.cpf}/>
                <input type="text" name={form.email} value={form.email}/>
                <input type="text" name={telefone} value={telefone}/>
                <input type="text" name={form.city} value={form.city}/>
                <input type="text" name={form.gender} value={form.gender}/>
                <input type="text" name={form.color} value={form.color}/>
                <input type="text" name={form.level} value={form.level}/>
                <input type="text" name={form.course} value={form.course}/>
                <input type="text" name={form.awareness} value={form.awareness}/>
                <input type="text" name={form.shareData} value={form.shareData}/>
                <input type="submit" value="Enviar" />
            </form>
            <Button>Concluído</Button>
        </div>
    );
};

export default FinishForm;
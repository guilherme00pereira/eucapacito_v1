import {useEffect} from "react";

const Temp = () => {

    useEffect(() => {
        new window.RDStationForms('ec-pesquisa-satisfacao-oficial-550608fd5a046541c2fc', 'UA-176452904-1').createForm();
    })

    return (
        <div>
            <div role="main" id="ec-pesquisa-satisfacao-oficial-550608fd5a046541c2fc"></div>
        </div>
    );
};

export default Temp;
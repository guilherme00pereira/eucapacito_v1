import {useState} from "react";
import { QuizContext } from "../ApplicationContexts";
import Questions from "../components/Quiz/Questions";
import QuizComplete from "../components/Quiz/QuizComplete";
import MetadataManager from "../layouts/MetadataManager";


const Quiz = () => {
    const [validation, setValidation] = useState([]);
    const [finish, setFinish] = useState(false);
    
    return (
        <QuizContext.Provider value={[validation, setValidation]}>
            <MetadataManager ispage={true} value="default" />
            {finish ? 
                <QuizComplete /> :
                <Questions setFinish={setFinish} />
            }
        </QuizContext.Provider>
    );
};

export default Quiz;



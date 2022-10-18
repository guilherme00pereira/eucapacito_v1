import {useState} from "react";
import { QuizContext } from "../../../src/services/context";
import Questions from "../../../src/components/Quiz/Questions";
import QuizComplete from "../../../src/components/Quiz/QuizComplete";


const Quiz = () => {
    const [validation, setValidation] = useState([]);
    const [finish, setFinish] = useState(false);
    
    return (
        <QuizContext.Provider value={[validation, setValidation]}>
            {finish ? 
                <QuizComplete /> :
                <Questions setFinish={setFinish} />
            }
        </QuizContext.Provider>
    );
};

export default Quiz;
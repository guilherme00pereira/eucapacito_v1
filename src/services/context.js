import {createContext} from 'react';

export const AppContext = createContext();

export const StepsContext = createContext({
    steps: [],
    course: {}
});

export const QuizContext = createContext({});


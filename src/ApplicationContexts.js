import {createContext} from 'react';

export const SearchContext = createContext('');

export const StepsContext = createContext({
    steps: [],
    course: {}
});

export const QuizContext = createContext({});


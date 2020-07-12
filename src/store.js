import {createStore} from "redux";

const store = createStore((st = {}, a) => {
    switch (a.type) {
        case 'UPDATE_SCORE':
            return {...st, score: a.score};
        default: return st;
    }
});

export default store;
import {createStore} from "redux";

const store = createStore((st = {newGame: true}, a) => {
    switch (a.type) {
        case 'UPDATE_SCORE':
            return {...st, score: a.score};
        case 'VICTORY':
            return {...st, finalScore: a.score, status: 'VICTORY',  newGame: false};
        case 'LOSS':
            return {...st, finalScore: a.score, status: 'LOSS',  newGame: false};
        case 'START':
            return {...st, status: 'PLAYING', newGame: true};
        default: return st;
    }
});

export default store;
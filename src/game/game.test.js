import looper from "./looper";
import snake from './snake';
import {bootGame, controller} from "./index";

const makeMockConfig = (nRows, nCols) => ({
    nRows, nCols
});

describe('moves according to vector', () => {
    [
        {
            name: 'ArrowUp',
            vect: [0, -1],
        },
        {
            name: 'ArrowDown',
            vect: [0, 1],
        },
        {
            name: 'ArrowRight',
            vect: [1, 0],
        },
        {
            name: 'ArrowLeft',
            vect: [-1, 0],
        },
    ].forEach(t => test('moves 1 cell ' + t.name, () => {
        const config = makeMockConfig(50, 50);

        const {state, nextTick} = bootGame(config);
        const {move} = controller(state.snake);

        const [x0, y0] = state.snake.getCells()[0];

        move(t.name)

        nextTick();

        const [x1, y1] = state.snake.getCells()[0];
        expect(x1).toEqual(x0 + t.vect[0]);
        expect(y1).toEqual(y0 + t.vect[1]);
    }));
});

describe('loses game on colision with wall', () => {
    [
        {
            name: 'colides with top wall',
            vect: [0, -1],
            ticks: 11,
        },
        {
            name: 'colides with right wall',
            vect: [1, 0],
            ticks: 3,
        },
        {
            name: 'colides with bottom wall',
            vect: [0, 1],
            ticks: 3,
        },
        {
            name: 'colides with left wall',
            vect: [-1, 0],
            ticks: 11,
        },
    ].forEach(t => test(t.name, () => {
        const config = makeMockConfig(13, 13);
        const {state, nextTick} = bootGame(config);
        state.snake.moveHeadTo(10, 10);
        state.snake.changeVector(t.vect);

        for (let i = 0; i < t.ticks - 1; i++) {
            const {status} = nextTick();
            expect(status).toEqual('ONGOING');
        }

        const {status} = nextTick();
        expect(status).toEqual('PLAYER_LOST');
    }));
});
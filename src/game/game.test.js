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
        state.snake.moveHeadTo(10, 10);
        state.snake.changeVector(t.vect);

        nextTick();

        const [x1, y1] = state.snake.getCells()[0];
        expect(x1).toEqual(10 + t.vect[0]);
        expect(y1).toEqual(10 + t.vect[1]);
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


describe('events test', () => {
    const config = makeMockConfig(13, 13);

    test('eating increases size', () => {
        const {state, nextTick} = bootGame(config);
        const initialLen = state.snake.getCells().length;
        state.snake.moveHeadTo(state.food[0][0] - state.snake.getVector()[0], state.food[0][1] - state.snake.getVector()[1]);
        nextTick();
        expect(state.snake.getCells().length).toEqual(initialLen + 1);
    });

    test('hitting wall with wrapAround config makes snake move to opposite side', () => {
        const {state, nextTick} = bootGame({
            ...config,
            wrapAround: true,
        });
        state.snake.changeVector([-1, 0]);
        state.snake.moveHeadTo(0, 0);
        const {status} = nextTick();
        expect(status).toEqual('ONGOING');
        expect(state.snake.getCells()[0]).toEqual([config.nCols - 1, 0]);
    });
});
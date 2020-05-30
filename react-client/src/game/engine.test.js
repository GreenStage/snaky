import engine from "./engine";
import snake from './snake';

const makeMockConfig = (nRows, nCols) => ({
    nRows, nCols
});

const makeMockState = () => (
    {
        playing: true,
        players: [
            {
                name: 'centerSnake',
                snake: snake({
                    vector: [0, -1],
                    cells: [
                        [10, 10],
                        [10, 9],
                        [10, 8]
                    ]
                })
            }
        ],
        food: []
    });

const getPlayerByName = (state, name) => state.players.find(p => p.name === name);

describe('moves according to vector', () => {
    [
        {
            name: 'up',
            vect: [0, -1],
        },
        {
            name: 'down',
            vect: [0, 1],
        },
        {
            name: 'right',
            vect: [1, 0],
        },
        {
            name: 'left',
            vect: [-1, 0],
        },
        {
            name: 'diagonal fast',
            vect: [-4, 8],
        }
    ].forEach(t => test('moves 1 cell ' + t.name, () => {
        const state = makeMockState();

        const p = getPlayerByName(state, 'centerSnake');
        const [x0, y0] = p.snake.cells[0];

        p.snake.changeVector(t.vect);

        engine(makeMockConfig(20, 20), state).nextTick();

        const [x1, y1] = p.snake.cells[0];
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
        const state = makeMockState();

        const p = getPlayerByName(state, 'centerSnake');
        const [x0, y0] = p.snake.cells[0];

        p.snake.changeVector(t.vect);

        let result;
        for(let i = 0; i < t.ticks - 1; i++){
            result = engine(makeMockConfig(13, 13), state).nextTick();
            expect(result.status).toEqual('ongoing');
        }
        result = engine(makeMockConfig(13, 13), state).nextTick();
        expect(result.status).toEqual('player loss');
        expect(result.player.name).toEqual('centerSnake');
    }));
});
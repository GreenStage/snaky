import snake from "./snake";
import looper from './looper';

const bootGame = (config) => {
    const center = [Math.floor(config.nCols / 2), Math.floor(config.nRows / 2)];
    const initialState = {
        snake: snake({
            vector: [1, 0],
            cells: [
                [...center],
                [center[0] - 1, center[1]],
            ],
        }),
        food: [
            [center[0] + 1, center[1]]
        ],
        score: 0,
        playing: true,
    }

    return looper(config, initialState);
}

export default bootGame;
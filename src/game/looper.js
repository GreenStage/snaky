import {didSnakeEat, didSnakeHitWall, didSnakeHitItself} from "./events";

const looper = (config, state) => {

    const getFreeCells = () => {
        const r = [];
        const used = {};

        state.food.forEach(([xf, yf]) => {
            used[xf + "_" + yf] = true;
        });

        state.snake.getCells().forEach(([xs, ys]) => {
            used[xs + "_" + ys] = true;
        });

        for (let i = 0; i < config.nCols; i++) {
            for (let j = 0; j < config.nRows; j++) {
                if (!used[i + "_" + j]) r.unshift([i, j])
            }
        }
        return r;
    }

    const spawnFood = () => {
        const freeCells = getFreeCells();
        if (freeCells.length == 0) return false;

        const rnd = Math.floor(Math.random() * freeCells.length)
        state.food.unshift(freeCells[rnd]);
    }

    const wrapAroundMap = ([x, y]) => {
        if (x === -1) return [config.nCols - 1, y];
        if (x === config.nCols) return [0, y];
        if (y === -1) return [x, config.nRows - 1];
        if (y === config.nRows) return [x, 0];
    }

    const nextTick = () => {
        if (!state.playing) return {status: 'finished'};

        state.snake.walk();

        if (didSnakeHitItself(state.snake)) return {
            status: 'PLAYER_LOST',
            score: state.score,
        };

        if (didSnakeHitWall(config, state.snake)) {
            if (!config.wrapAround) return {
                status: 'PLAYER_LOST',
                score: state.score,
            };

            const [nextX, nextY] = wrapAroundMap(state.snake.getCells()[0]);
            state.snake.moveHeadTo(nextX, nextY);
        }

        const foodIndex = didSnakeEat(state.snake, state.food);
        if (foodIndex > -1) {
            state.food.splice(foodIndex, 1);
            state.snake.grow();
            state.score++;
            spawnFood();
        }

        return {
            status: 'ONGOING',
            score: state.score,
        };
    }

    return {state, nextTick}
}
export default looper;
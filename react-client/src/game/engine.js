const engine = (config, state) => {
    const didLose = ({snake}) => {
        const [x, y] = snake.cells[0];
        if (x < 0 || x >= config.nCols || y < 0 || y >= config.nRows) {
            return true; //player hit wall, lost
        }

        //Check if colided with another player's snake
        return state.players
            .filter(p => p.snake != snake)
            .some(({snake}) => snake.cells
                .some(([x2, y2]) => x === x2 && y === y2));
    }

    const didEat = ({snake}) => {
        const [x, y] = snake.cells[0];
        return state.food.findIndex(([xf, yf]) => xf === x && yf === y);
    }

    const nextTick = () => {
        if (!state.playing) return {status: 'finished'};

        let returnV;
        for (const player of state.players) {
            player.snake.walk();
            if (didLose(player)) {
                returnV = returnV || {
                    status: 'player loss',
                    player
                };
                continue;
            }
            const foodIndex = didEat(player);
            if (foodIndex > -1) {
                state.food.splice(foodIndex, 1);
                player.snake.grow();
            }
            return {status: 'ongoing'};
        }
        return returnV;
    }
    return {nextTick}
}
export default engine;
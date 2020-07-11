const didSnakeHitWall = (config, snake) => {
    const [x, y] = snake.getCells()[0];
    return (x < 0 || x >= config.nCols || y < 0 || y >= config.nRows);
}

const didSnakeHitItself = (snake) => {
    const snakeCells = snake.getCells();
    for (let i = 1; i < snakeCells.length; i++) {
        if (snakeCells[i][0] === snakeCells[0][0] && snakeCells[i][1] === snakeCells[0][1]) {
            return true;
        }
    }
    return false;
}

const didSnakeEat = (snake, food) => {
    const [x, y] = snake.getCells()[0];
    return food.findIndex(([xf, yf]) => xf === x && yf === y);
}

export {didSnakeEat, didSnakeHitItself, didSnakeHitWall};
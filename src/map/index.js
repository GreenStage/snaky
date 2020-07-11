const map = (canvas, config, state) => {
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;
    const cellW = width / config.nCols;
    const cellH = height / config.nRows;
    ctx.globalCompositeOperation = 'source-over';

    const draw = () => {
        ctx.strokeStyle = config.gridStrokeStyle;
        ctx.fillStyle = config.background;
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < config.nCols; i++) {
            for (let j = 0; j < config.nRows; j++) {
                ctx.strokeRect(i * cellW, j * cellH, cellW, cellH);
            }
        }

        ctx.save()
        ctx.fillStyle = config.foodColor;
        for (const [x, y] of state.food) {
            ctx.fillStyle = config.foodColor;
            ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
        ctx.restore();

        for (const [x, y] of state.snake.getCells()) {
            ctx.fillStyle = config.snakeColor;
            ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
    }
    return {draw};
}

export default map;
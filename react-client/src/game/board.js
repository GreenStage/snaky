const canvasStyle = {
    background: "#ffffff",
    gridStrokeStyle: "#d2d2d2",
    foodColor: "#2ca51f",
}

const board = (canvas, nCols, nRows, state) => {
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;
    const cellW = width / nCols;
    const cellH = height / nRows;
    ctx.globalCompositeOperation = 'source-over';

    const draw = () => {
        ctx.strokeStyle = canvasStyle.gridStrokeStyle;
        ctx.fillStyle = canvasStyle.background;
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < nCols; i++) {
            for (let j = 0; j < nRows; j++) {
                ctx.strokeRect(i * cellW, j * cellH, cellW, cellH);
            }
        }

        ctx.save()
        ctx.fillStyle = canvasStyle.foodColor;
        for (const [x, y] of state.food) {
            ctx.fillStyle = canvasStyle.foodColor;
            ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
        ctx.restore();

        for (let p of state.players) {
            for (const [x, y] of p.snake.cells) {
                ctx.fillStyle = '#FFFF00';
                ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
            }
        }
    }
    return {draw};
}

export default board;
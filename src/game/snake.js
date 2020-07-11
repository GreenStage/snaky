const snake = (initialState = {}) => {
    const state = {
        ...initialState
    };

    const getVector = () => state.vector;
    const getCells = () => state.cells;
    const moveHeadTo = (x, y) => {
        state.cells.unshift([x, y]);
        state.cells.pop();
    }

    const walk = () => {
        state.vector = state.newVector || state.vector;
        delete (state.newVector);

        moveHeadTo(state.cells[0][0] + state.vector[0], state.cells[0][1] + state.vector[1]);
    };

    const changeVector = newVector => {
        state.newVector = newVector
    }

    const grow = () => state.cells.push(state.cells[state.cells.length - 1]);

    return {walk, changeVector, grow, getVector, getCells, moveHeadTo};
}

export default snake;
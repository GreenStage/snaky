const snake = (initialState = {}) => {
    const state = {
        ...initialState
    };
    const walk = () => {
        state.cells.unshift([
            state.cells[0][0] + state.vector[0],
            state.cells[0][1] + state.vector[1],
        ]);
        state.cells.pop();
    };

    const changeVector = newVector => {
        state.vector[0] = newVector[0];
        state.vector[1] = newVector[1];
        return true;
    }

    const grow = () => state.cells.push(state.cells[state.cells.length - 1]);

    return {walk, changeVector, grow, ...state};
}

export default snake;
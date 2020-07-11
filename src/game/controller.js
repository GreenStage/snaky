const controller = (snake) => {
    const mapKeyToVector = {
        'ArrowLeft': [-1, 0],
        'ArrowDown': [0, 1],
        'ArrowRight': [1, 0],
        'ArrowUp': [0, -1]
    };

    const move = (key) => {
        let newVector = mapKeyToVector[key];
        const currentVector = snake.getVector();

        if (!(newVector || currentVector[0] === -newVector[0]) && (currentVector[1] === -newVector[1])) {
            return;
        }

        snake.changeVector(newVector);
    }
    return {move};
}

export default controller;
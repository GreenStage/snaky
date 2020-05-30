const controller = (player) => {
    const mapKeyToVector = {
        'ArrowLeft': [-1, 0],
        'ArrowDown': [0, 1],
        'ArrowRight': [1, 0],
        'ArrowUp': [0, -1]
    };

    const move = (key) => {
        const newVector = mapKeyToVector[key];
        if (!newVector || (player.snake.vector[0] == -newVector[0] && player.snake.vector[1] == -newVector[1])) {
            //player cant stop by choice
            return false; //cant walk on oposite direction
        }
        player.snake.changeVector(newVector);
    }
    return {move};
}

export default controller;
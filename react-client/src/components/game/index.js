import React, {useCallback, useEffect, useRef, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {board, engine, snake, controller} from '../../game/';

const canvasSize = {
    width: 800,
    height: 600
}

const config = {
    nCols: 32,
    nRows: 24,
}

const useStyles = makeStyles({
    canvas: {
        width: canvasSize.width,
        height: canvasSize.height,
        margin: '0 auto',
    },
});

function Game() {
    const classes = useStyles();
    const canvasRef = useRef();

    const mockInitialState = {
        playing: true,
        players: [
            {
                name: "player1",
                snake: snake({
                    vector: [0, 1],
                    cells: [
                        [1, 1],
                        [0, 1],
                        [0, 0],
                    ]
                })
            },
            {
                name: "player2",
                snake: snake({
                    vector: [0, -1],
                    cells: [
                        [15, 1],
                        [15, 2],
                    ]
                })
            }
        ],
        food: [
            [7, 8],
            [17, 2]
        ]
    }

    let _engine, _controller, _board, keyUpHandler;

    useEffect(() => {
        _engine = engine(config, mockInitialState);
        _controller = controller(mockInitialState.players[0]);
        _board = board(canvasRef.current, config.nCols, config.nRows, mockInitialState);

        keyUpHandler = ({key}) => {
            _controller.move(key);
        }

        window.addEventListener("keyup", keyUpHandler);
        const id = setInterval(() => {
            const isPlaying = _engine.nextTick();
            if (!isPlaying) {
                clearInterval(id);
                return;
            }
            _board.draw();
        }, 100)

        return () => {
            clearInterval(id);
            window.removeEventListener("keyup", keyUpHandler);
        }
    }, []);

    return (
        <canvas ref={canvasRef} className={classes.canvas} width={canvasSize.width} height={canvasSize.height} />
    )
}

export default Game;
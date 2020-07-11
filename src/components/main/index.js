import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Game from "../game";

let gameW, gameH;
if (window.innerWidth > window.innerHeight) {
    gameH = Math.floor(window.innerHeight);
    gameW = Math.floor(gameH * 4 / 3);
} else {
    gameW = Math.floor(window.innerWidth);
    gameH = Math.floor(3 * gameW / 4);
}
const useStyles = makeStyles({
    root: {
        background: '#1a202f',
        height: '100vh',
        width: '100vw',
    },
    board: {
        position: 'absolute',
        left: gameW,
        top:0,
        color: '#ffffff',
        fontSize: '2rem',
    },
});

export default function () {
    const classes = useStyles();
    const [score, setScore] = useState(0);

    return (
        <div className={classes.root}>
            <div className={classes.board}>{score}</div>
            <Game width={gameW} height={gameH} onScoreUpdate={setScore} onLose={() => {
            }} onVictory={() => {
            }}/>
        </div>
    );
}
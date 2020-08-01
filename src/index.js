import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import './index.css';
import Game from "./components/game";
import Board from "./components/board";
import AlertPage from './components/alert-page';
import store from "./store";

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
    game: {
        position: 'absolute',
        left: gameW,
        top: 0,
        color: '#ffffff',
        fontSize: '2rem',
        width: window.innerWidth - gameW,
    },
});

const Root = () => {
    const classes = useStyles();
    return (
        <React.StrictMode>
            <Provider store={store}>
                <div className={classes.root}>
                    <AlertPage/>
                    <Board className={classes.game}/>
                    <Game width={gameW} height={gameH}/>
                </div>
            </Provider>
        </React.StrictMode>
    )
};

ReactDOM.render(<Root/>, document.getElementById('root'));
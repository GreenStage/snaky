import React, {useEffect, useRef} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {bootGame, controller} from '../../game/';
import loadMap from '../../map';
import {connect} from "react-redux";

const config = {
    nCols: 32,
    nRows: 24,
    wrapAround: true,
    snakeColor: '#ff4800',
    background: "#1a202f",
    gridStrokeStyle: "#525f80",
    foodColor: "#65d459",
    updatePeriod: 90,
}

const useStyles = makeStyles({
    canvas: {
        margin: '0 auto',
    },
});

const Game = React.memo(({width, height, newGame, started, onVictory, onLose, onScoreUpdate}) => {
    const classes = useStyles();
    const canvasRef = useRef();

    useEffect(() => {
        if(!newGame) return;
        const {state, nextTick} = bootGame(config, started);
        const {move} = controller(state.snake);
        const {draw} = loadMap(canvasRef.current, config, state);

        const keyUpHandler =({key}) => {
            started && move(key);
        };
        window.addEventListener("keydown", keyUpHandler);

        const id = setInterval(() => {
            state.started = started;
            const {status, score} = nextTick();
            switch (status) {
                case 'PLAYER_LOST':
                    clearInterval(id);
                    onLose(score);
                    break;
                case 'PLAYER_WIN':
                    clearInterval(id);
                    onVictory(score);
                    break;
                default:
                    onScoreUpdate(score);
                    draw();
            }
        }, config.updatePeriod);

        return () => {
            clearInterval(id);
            window.removeEventListener("keydown", keyUpHandler);
        }
    }, [onLose, onVictory, onScoreUpdate,started, newGame]);

    return (
        <canvas ref={canvasRef} className={classes.canvas} width={width} height={height}/>
    );
});

const mapDispatchToProps = dispatch => ({
    onScoreUpdate: score => dispatch({
        type: 'UPDATE_SCORE',
        score
    }),
    onVictory: score => dispatch({
        type: 'VICTORY',
        score
    }),
    onLose:  score => dispatch({
        type: 'LOSS',
        score
    }),
})

const mapStateToProps = state => ({
    newGame: state.newGame,
    started: state.status === 'PLAYING',
})
export default connect(mapStateToProps  , mapDispatchToProps)(Game);
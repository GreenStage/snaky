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
    updatePeriod: 100,
}

const useStyles = makeStyles({
    canvas: {
        margin: '0 auto',
    },
});

const Game = React.memo(({width, height, onVictory, onLose, onScoreUpdate}) => {
    const classes = useStyles();
    const canvasRef = useRef();
    useEffect(() => {
        const {state, nextTick} = bootGame(config);
        const {move} = controller(state.snake);
        const {draw} = loadMap(canvasRef.current, config, state);

        const keyUpHandler = ({key}) => move(key);

        window.addEventListener("keydown", keyUpHandler);

        const id = setInterval(() => {
            const {status, score, message} = nextTick();
            switch (status) {
                case 'PLAYER_LOST':
                    clearInterval(id);
                    onLose(message, score);
                    break;
                case 'PLAYER_WIN':
                    clearInterval(id);
                    onVictory(message, score);
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
    }, [onLose, onVictory, onScoreUpdate]);

    return (
        <canvas ref={canvasRef} className={classes.canvas} width={width} height={height}/>
    );
});

const mapDispatchToProps = dispatch => ({
    onScoreUpdate: score => dispatch({
        type: 'UPDATE_SCORE',
        score
    }),
    onVictory: () => {},
    onLose: () => {},
})

export default connect(null, mapDispatchToProps)(Game);
import React from "react";
import { connect } from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import snake from './img/snake.png';

const useStyles = makeStyles({
    header:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    snake:{
        width: '2em',
        margin: '0.5em 0.5em 0 0',
    },
    score:{
        textAlign:'center',
        fontSize:'4rem',
    }
});

const Board = ({className = '', score = 0}) => {
    const classes = useStyles();
    return (
        <div className={className}>
            <div className={classes.header}>
                <img className={classes.snake} src={snake} alt="snaky" />
                <h1>Snaky</h1>
                v0.1
            </div>
                <p id="score" className={classes.score}>{Math.max(0,score)}</p>
        </div>
    );
}

const mapStateToProps = (state) => ({
    score: state.score,
});

export default connect(mapStateToProps)(Board);
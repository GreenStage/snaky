import React from "react";
import { connect } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        position:'absolute',
        width:'100vw',
        height:'100vh',
        background: 'rgba(0,0,0,0.7)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '100vh',
        alignItems: 'center',
        justifyItems: 'center',
    },
    dialog:{
        background: '#ffffff',
        padding: '1.4em 2em 1.4em 2em',
        width:'18em',
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        fontFamily: "'Roboto', sans-serif",
    },
    onTop:{
        zIndex:99,
    },
    hide:{
        display: 'none'
    },
    btnPlay:{
        margin:'0.3em',
    }
});



const AlertPage = ({status, finalScore, onPlay}) => {
    const messages = {
        'LOSS': <><p>You lose!</p><p>Scored {finalScore} points</p></>,
        'VICTORY': <><p>You win!</p><p>Scored {finalScore} points</p></>,
    };
    const classes= useStyles();
    return (
        <div className={`${classes.root} ${status !== 'PLAYING' ? classes.onTop: classes.hide}` }>
            <div className={classes.dialog}>
                {messages[status] || <p>Whenever you're ready!</p>}
                <button onClick={onPlay} className={`nes-btn is-primary ${classes.btnPlay}`} type="button">Play</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    onPlay: () => dispatch({
        type: 'START',
    }),
})

export default connect(mapStateToProps,mapDispatchToProps)(AlertPage);
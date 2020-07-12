import React from "react";
import { connect } from 'react-redux';

const Board = ({className, score}) => (
    <div className={className}>
        {score}
    </div>
);

const mapStateToProps = (state) => ({
    score: state.score,
});

export default connect(mapStateToProps)(Board);
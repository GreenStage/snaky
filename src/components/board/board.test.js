import React from 'react'
import {createStore} from 'redux'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Board from "./index";
import {Provider} from "react-redux";
import store from "../../store";

describe('board tests', () => {
    test('renders correctly', () => {
        const {container} = render(
            <Provider store={store}>
                <Board/>
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });

    test('updates counter on score update', () => {
        const {container} = render(
            <Provider store={store}>
                <Board/>
            </Provider>
        );

        const scoreEl = container.querySelector('[id="score"]');
        expect(scoreEl).toBeTruthy();
        store.dispatch({
            type: 'UPDATE_SCORE',
            score: '22',
        });
        expect(scoreEl).toHaveTextContent(22);
    });
})
import { createStore } from 'redux';
import { reducer } from './feature/core';

function makeStore() {
    return createStore(reducer);
}

export default makeStore;
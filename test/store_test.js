import { List, Map, fromJS } from 'immutable';
import { test } from 'ava';
import { actionTest, reducerTest } from 'redux-ava';

import makeStore from '../src/store';
import { 
    defaultState as initialState,
    setEntriesAction, 
} from '../src/feature/core'

const newEntries = Map({entries: List.of('Trainspotting','28 Days Later', 'Sunshine')});

test('Store : is a Redux store configured with the correct reducder', t => {
    t.plan(2)
    const store = makeStore();

    t.deepEqual(
        JSON.stringify(store.getState()), 
        JSON.stringify(initialState)
    );

    store.dispatch(setEntriesAction(List.of('Trainspotting', '28 Days Later', 'Sunshine')));

    t.deepEqual(
        JSON.stringify(store.getState()),
        JSON.stringify(newEntries),
    );
})
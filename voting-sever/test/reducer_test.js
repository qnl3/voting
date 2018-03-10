import { Map, fromJS, List, is } from 'immutable';
import test from 'ava';
import { actionTest, reducerTest } from 'redux-ava';

//import {setEntriesAction, nextAction, voteAction} from '../src/reducer';
import { 
    reducer, 
    setEntriesAction, 
    nextAction, 
    voteAction,
    defaultState as initialState 
 } from '../src/feature/core';

const newEntries = Map({entries: List.of('Trainspotting','28 Days Later', 'Sunshine')});
const votingSetup = Map({entries: List.of('Sunshine', ), vote: Map({pair: List.of('Trainspotting','28 Days Later')})});
const afterFirstVote = votingSetup.updateIn(['vote','tally','Trainspotting'], 0, tally => tally + 1);
const winner = Map({winner: 'Trainspotting'});
const actions = [
    setEntriesAction(List.of('Trainspotting','28 Days Later')),
    nextAction(),
    voteAction('Trainspotting'),
    voteAction('28 Days Later'),
    voteAction('Trainspotting'),
    nextAction(),
];

test('Action : setEntriesAction', actionTest(
    setEntriesAction,
    ['Trainspotting','28 Days Later', 'Sunshine'],
    { type: 'voting-app/reducer/SET_ENTRIES', payload: { entries: ['Trainspotting','28 Days Later', 'Sunshine']}} 
));

test('Action : voting-app/reducer/NEXT', actionTest(
    nextAction,
    { type: 'voting-app/reducer/NEXT'} 
));

test('Reducer : handles voting-app/reducer/SET_ENTRIES', reducerTest(
    reducer, 
    initialState, 
    setEntriesAction(List.of('Trainspotting','28 Days Later', 'Sunshine')),
    newEntries
));

test('Reducer : handles voting-app/reducer/NEXT with empty entries', reducerTest(
    reducer,
    initialState,
    nextAction(),
    Map({entries: List(),vote: Map({ pair: List()})})
));

test('Reducer : handles voting-app/reducer/NEXT with entries',reducerTest(
    reducer,
    newEntries,
    nextAction(),
    votingSetup 
));

test('Reducer : handles VOTE', reducerTest(
    reducer,
    votingSetup,
    voteAction('Trainspotting'),
    afterFirstVote
));

// test('Reducer : it has an initial state', reducerTest(
//     reducer,
//     initialState,
//     setEntriesAction(List.of(['Trainspotting','28 Days Later', 'Sunshine']),
//     initialState,
// )));

test('Reducer : it has an initial state : Expanded', t => {
    const nextState = reducer(undefined, setEntriesAction(List.of('Trainspotting','28 Days Later', 'Sunshine')));
    t.is(
        JSON.stringify(newEntries),
        JSON.stringify(nextState),
    );
});

test('Reducer : can be used with reducer : Expanded', t => {
    const actions = [
        setEntriesAction(List.of('Trainspotting','28 Days Later')),
        nextAction(),
        voteAction('Trainspotting'),
        voteAction('28 Days Later'),
        voteAction('Trainspotting'),
        nextAction(),
    ];
    const finalState = actions.reduce(reducer,initialState);
    t.is(
        JSON.stringify(winner),
        JSON.stringify(finalState),
    )
})



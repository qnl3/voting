import { Map } from 'immutable';
import { setEntries, next, vote } from '../feature/core';
import { createActions, createAction, handleActions, combineActions } from 'redux-actions';

const defaultState = Map();
const {setEntriesAction, voteAction} = createActions({
    'voting-app/reducer/SET_ENTRIES': entries => ({entries}),
    'voting-app/reducer/VOTE':  entry => ({entry})
});
const nextAction = createAction('voting-app/reducer/NEXT');

const reducer = handleActions({
    [setEntriesAction] (state, {payload: action}) {
        return setEntries(state, action.entries);
    },
    [voteAction] (state, {payload: action}) {
        return vote(state, action.entry);
    },
    [nextAction] (state){
        return next(state);
    }
}, defaultState)

export default reducer;
export { setEntriesAction, nextAction, voteAction};
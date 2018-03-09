import { List, Map } from 'immutable';
import { createActions, createAction, handleActions, combineActions } from 'redux-actions';
import { isUndefined } from 'util';


const defaultState = Map({entries: List()});
//const defaultState = Map();
// Action Creators
const setEntriesAction = createAction('voting-app/reducer/SET_ENTRIES', entries => ({entries}));
const voteAction = createAction('voting-app/reducer/VOTE', entry => ({entry}));
// const {setEntriesAction, voteAction} = createActions({
//     'voting-app/': entries => ({entries}),
//     'VOTE_ACTION':  entry => ({entry})
// });

const nextAction = createAction('voting-app/reducer/NEXT_ACTION');

// Actions
function setEntries(state, entries) {
    return reducer(state, setEntriesAction(entries))
}

function vote(state, entry) {
    return reducer(state, voteAction(entry))
}

function getWinner (vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if (aVotes > bVotes) return [a];
    if (aVotes < bVotes) return [b];
    return [a,b];
}

function next(state) {
    const entries = state.get('entries').concat(getWinner(state.get('vote')));

    if (entries.size === 1) {
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    }

    return state.merge({
        vote: Map({
            pair: entries.take(2)
        }),
        entries: entries.skip(2)
    })
}

// Reducers
const reducer = handleActions({
    [setEntriesAction] (state = defaultState, {payload: action}) {
        return state.set('entries',action.entries);
    },
    [voteAction] (state, {payload: action}) {
        return state.update( 'vote', voteState => voteState.updateIn(['tally', action.entry], 0, tally => tally + 1));
    },
    [nextAction] (state){
        return next(state);
    }
}, defaultState)

// Selectors

//// Default Export
export default reducer;

// Action Exports
export { setEntriesAction, nextAction, voteAction, setEntries, next, vote};

// Variable Exports
export { defaultState };
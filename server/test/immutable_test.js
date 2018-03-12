import test from 'ava';
import {List, Map} from 'immutable';

test('functional state processing', t => {
    t.plan(2)
    function increment(currentState) {
        return currentState +1;
    }

    let state = 42;
    let nextState = increment(state);

    t.is(nextState, 43);
    t.is(state, 42);
})

test('Immutable list', t => {
    t.plan(2)
    function addMovie(currentState, movie) {
        return currentState.push(movie);
    }

    let state = List.of('Trainspotting', '28 Days Later');
    let nextState = addMovie(state, 'Sunshine');

    t.true(nextState.equals(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
    )));
    t.true(state.equals(List.of(
        'Trainspotting', 
        '28 Days Later'
    )));
})

test("Immutable tree", t => {
    t.plan(2)
    function addMovie(currentState, movie) {
        return currentState.update('movies', 'movies', movies => movies.push(movie));
    }

    let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
    });
    let nextState = addMovie(state, 'Sunshine');
    t.true(
        state.equals( 
        Map({movies: List.of('Trainspotting','28 Days Later')})))
    t.true(nextState.equals(Map({movies: List.of('Trainspotting','28 Days Later', 'Sunshine')})))
})
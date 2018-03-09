import test from 'ava';
import {List, Map} from 'immutable';

import {setEntries, next, vote } from '../src/feature/core';

test('Application logic : setEntries : Sets initial entries.', t => {
    const state = Map();
    const entries = List.of('Trainspotting', '28 Days Later');
    const nextState = setEntries(state, entries);
    t.is( JSON.stringify(nextState),JSON.stringify(Map({entries: List.of('Trainspotting', '28 Days Later')})))
});

test ( "Application logic : setEntries : converts map to immutable", t => {
    const state = Map();
    const entries = ['Trainspotting', '28 Days Later'];
    const nextState = setEntries(state, entries);
    t.is( 
        JSON.stringify(nextState),
        JSON.stringify(Map({entries: List.of('Trainspotting', '28 Days Later')}))
    )
});

test ( 'Application logic : next : it takes the next two entries for voting', t => {
    const state = Map({entries: List.of('Trainspotting','28 Days Later', 'Sunshine')});
    const nextState = next(state);
    t.is(
        JSON.stringify(nextState),
        JSON.stringify(
            Map({ 
                entries: List.of('Sunshine'),
                vote: Map({pair: List.of('Trainspotting','28 Days Later')})
            })
        )
    );
});

test( 'Application logic : next : puts winner of current vote back in entries', t => {
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting','28 Days Later'),
            tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 2
            })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    t.deepEqual(
        JSON.stringify(
            Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting'),
            })
        ),
        JSON.stringify(nextState)
    );
});

test('Application logic : next : marks winner when just one entry left', t => {
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting','28 Days Later'),
            tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 2
            })
        }),
        entries: List()
    });
    const nextState = next(state);
    t.is(
        JSON.stringify(nextState),
        JSON.stringify(
            Map({winner: 'Trainspotting'})
        )
    )
});

test( 'Application logic : vote : create a tally for the vote entry', t => {
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting','28 Days Later')
        }),
    })
    const nextState = vote(state, 'Trainspotting');
    t.is(
        JSON.stringify(nextState),
        JSON.stringify(Map({
            vote: Map({
                pair: List.of('Trainspotting','28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }),
        })
    ));
});
    
test ( 'Application login : vote : adds to existing tally for the vote entry', t =>{
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting','28 Days Later'),
            tally: Map({
                'Trainspotting': 3,
                '28 Days Later': 2
            }),
        }),
    });
    const nextState = vote(state, 'Trainspotting')
   
    t.is(
        JSON.stringify(nextState),
        JSON.stringify(
            Map({
                vote: Map({
                    pair: List.of('Trainspotting','28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
            })
        )
    )
});

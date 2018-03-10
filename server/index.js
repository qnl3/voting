import makeStore from './src/store';
import defaultServer from './src/server';

export const store = makeStore();
defaultServer(store);

store.dispatch({
    type: 'voting-app/reducer/SET_ENTRIES',
    payload: require('./entries.json')
});
store.dispatch({type: 'voting-app/reducer/NEXT'});
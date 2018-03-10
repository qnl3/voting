import Server from 'socket.io';

function startServer(store, port) {
    const io = new Server().attach(port);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getStae().toJS());
        socket.on('action', store.dispatch.bind(store))
    })
}

function defaultServer(store) {
    startServer(store,8090);
}

export default defaultServer;
export { startServer };
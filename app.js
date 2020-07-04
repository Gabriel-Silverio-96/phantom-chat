const { app, port } = require('./config/server');
const server = app.listen(port, console.log("Server running"));

//Socket
const io = require('socket.io').listen(server);

//Variable global
app.set('io', io);

io.on('connection', socket => {
    console.log('User online');

    socket.on('disconnect', () => {
        console.log('Offline user')
    });

    //Dialog event
    socket.on('dialog', data => {
        //Dialog add all users
        socket.emit('dialogAdd', {
            nickname: data.nickname,
            message: data.message
        })

        socket.broadcast.emit('dialogAdd', {
            nickname: data.nickname,
            message: data.message
        })

        //Add users online
        if (data.numberUsers == 0) {
            socket.emit('usersOnlineListAdd', {
                nickname: data.nickname
            })

            socket.broadcast.emit('usersOnlineListAdd', {
                nickname: data.nickname
            })
        }
    });
});
const http = require('http');
const express = require('express');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const { log } = require('console');
const io = new Server(server, {
  allowEIO3: true,
  cors: {
      origin: true,
      credentials: true
  },
});
 
app.use(cors( ));

 


app.use(router);

 

 

io.on('connect', (socket) => {
  // when new user joins
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return console.log(error);

   
    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});

    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);

    io.to(user.room).emit('message', { user: user.name, text: message });

    // callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});
const port=5000
server.listen(  port, () => console.log(`Server has started on port ${port}.`));
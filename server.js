const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log('Server is running on Port:', PORT)
});
const socket = require('socket.io');
const io = socket(server);

const messages = [];
const users = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  console.log(users);
  socket.on('join', (author) => {
    console.log('author', author)
    users.push({
      id: socket.id,
      author
    })
    socket.broadcast.emit('join', author);
    console.log(users);
  });
  socket.on('message', (message) => { 
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message); 
  });
  socket.on('disconnect', () => { 
    console.log('Oh, socket ' + socket.id + ' has left');
    const index = users.findIndex(user => user.id === socket.id);
    if (index !== -1) {
      console.log('User disconnected:',users[index].author);
      socket.broadcast.emit('userDisconnected', users[index].author); 
      users.splice(index, 1);
    }
    console.log('users after disconnect', users);
  });
  console.log('I\'ve added a listener on message event \n');
});

const io = require('socket.io')(3000);

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('message', message => {
    console.log('Message from client:', message);
    socket.emit('message', 'Hello from the server');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

console.log('Socket.io server running at http://localhost:3000/');

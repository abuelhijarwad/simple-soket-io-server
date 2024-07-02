const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;


io.on('connection', socket => {
  console.log('New user connected');

  socket.on('requestSound', () => {
    const filePath = path.join(__dirname, 'sound.mp3');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading sound file:', err);
        socket.emit('error', 'Error reading sound file');
        return;
      }
      socket.emit('soundFile', data);
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

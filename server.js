const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('requestSound', () => {
    const filePath = path.join(__dirname, 'sound.mp3');
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', chunk => {
      socket.emit('soundChunk', chunk);
    });

    readStream.on('end', () => {
      socket.emit('soundEnd');
    });

    readStream.on('error', err => {
      console.error('Error reading sound file:', err);
      socket.emit('error', 'Error reading sound file');
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

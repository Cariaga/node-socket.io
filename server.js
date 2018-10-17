'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.send("") )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);
var count =0;

var nsp = io.of('/nsp');
nsp.on('connection', function(socket){
  count++;
  io.emit('count',count);
  console.log('someone connected');
});
/*
io.on('connection', (socket) => {
  count++;
  io.emit('count',count);

  console.log('Client connected');
 // socket.on('disconnect', () => console.log('Client disconnected'));
});*/

setInterval(() => io.emit('count',  count++ ), 1000);

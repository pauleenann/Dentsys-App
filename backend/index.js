const express = require('express');
const http = require('http');
const {Server} = require('socket.io')
const cors = require('cors')

// Create an Express app
const app = express();

// prevent from getting connection errors
app.use(cors())

//how we create http server with react
const server = http.createServer(app)

// Server is a class
const io = new Server(server,{
    cors:{
        // url for frontend
        origin:"http://localhost:3000",
    }
})

// Handle WebSocket connections
io.on('connection', (socket) => {
  // Listen for an event from the client
  socket.on('newData', () => {
    console.log('new data inserted')
    io.emit('updatedData');
  });

  //listen to cancelled appointments
  socket.on('cancellAppointment', () => {
    console.log('appointment cancelled')
    //emit updatedData to render updated appointments table
    io.emit('updatedData');
  });

});

// Start the server
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

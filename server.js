//Initialise Server

//Importing express
const express = require('express');
const { Socket } = require('socket.io');

//sets up our express -> express allows us to create a server 
const app = express();

//making a server using http and express
const server = require('http').Server(app);

//giving src folder to my express app
app.use(express.static('src'));

//importing socket.io and linking it with server 
const io = require('socket.io')(server);

// a message is sent, so every one receive that message
io.on('connection', (Socket)=>{
    Socket.on('message', (data)=>{//user sending msg giving that msg to io
        io.emit('message',data); //emitting msg to all other sockets        
    })

    Socket.on("username enter", (data) =>{
        // watchman emits to everyone
        io.emit("username enter", data);
    })

    Socket.on("username left", (data) => {
        io.emit("username left", data);
      });


    Socket.on('disconnect', ()=>{
        console.log('User left the chat', Socket.id);
    })
})

//this is port on which our server will run
const PORT = 9000;
server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
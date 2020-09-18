var app = require('express')
var server = require('http').Server(app);
var io = require('socket.io')(server);

var client = '';

io.on('connection', function(socket) {
  console.log("client " + socket.id + " connected");
  socket.emit('message', 'connected to server'); 
  socket.on('storeClientID', data => {
    this.client = socket.id; 
    console.log("datastream established to client " + this.client);
    socket.to(this.client).emit('message', 'id stored, datastream established')
  }) 
  socket.on('message', (data) => {
      console.log(socket.id + ":", data);
      socket.to(this.client).emit('message', data)
  })
});

app2 = app();
app2.get("*", (req, res) => {
  res.send("Socket.io server is running on port 30001");
})

app2.listen(30002, () => {
  console.log("Server is listening on port 30001");
})

server.listen(30001, () => {
    console.log("Socket.io server listening on port 30001");
});
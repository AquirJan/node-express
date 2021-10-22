const io = require("socket.io")(3000);

io.on("connection", socket => {
    console.log(socket)
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("message", "Hey!");

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });
});
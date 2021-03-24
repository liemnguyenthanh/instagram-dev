const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require("http");
const app = express();


//dotenv
dotenv.config()

const port = 8080;

app.get('/', function(req, res){
    res.send("Hello World");
})

//tesat
app.use(cors());
app.use(bodyParser.json());
const mongodbUrl = process.env.DB_URL
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log('connected!'))
  .catch((error) => console.log(error.reason));

//demo
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const index = require('./modules/messages/route')
app.use(index);
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
    const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};






//import module
const userRouter = require('./modules/users/route')
const postRouter = require('./modules/posts/route')
const likeRouter = require('./modules/likes/route')
const commentRouter = require('./modules/comments/route')
const followRouter = require('./modules/follows/route')
//use modele
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/likes', likeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/follows', followRouter);

//listen port
app.listen(port, function(){
    console.log("Your app running on port http://localhost:" + port);
})
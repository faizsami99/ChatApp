
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/img', express.static(path.resolve(__dirname, 'assets/images')));
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/', require('./router/router'));

http.listen(PORT);

// Socket Programming

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('connected...')
    socket.on('message', (msg) =>{
        socket.broadcast.emit('message', msg);
    });
});
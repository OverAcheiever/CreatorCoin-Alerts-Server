const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    path: "/",
    cors: {
        origins: "*:*",
        methods: ["GET", "POST"]
    },
    transports: ['websocket', 'polling']
});
const bodyParser = require("body-parser")
app.use(bodyParser.json());
const websocket_port = 3000 || process.env.PORT;
const webhook_port = 9000 || process.env.PORT;

app.get('/', (res) => {
    res.sendStatus(401)
});

app.post('/POST/rally/creatorcoin/donate/OARPGGRRBPMKSIES', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    io.emit("donate", req.body)
})

app.post('/POST/rally/creatorcoin/purchase/7ZLUQH7BDQKVSAGM', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    io.emit("purchase", req.body)
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(webhook_port, () => {
    console.log(`WEBSOCKET SERVR: http://localhost:${websocket_port}`)
})

server.listen(websocket_port, () => {
    console.log(`WEBHOOK SERVER: http://localhost:${webhook_port}`);
});
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    path: "/websocket",
    cors: {
        origins: "*:*",
        methods: ["GET", "POST"]
    },
});
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser")
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendStatus(401)
})

app.get('/api/code/alerts', (req, res) => {
    console.log(__dirname + "/Alerts/client.html")
    res.sendFile(__dirname + "/Alerts/client.html")
})

app.post('/POST/rally/creatorcoin/donate/OARPGGRRBPMKSIES', (req, res) => {
    io.emit("donate", req.body)
    console.log(req.body);
    res.sendStatus(200);
})

app.post('/POST/rally/creatorcoin/purchase/7ZLUQH7BDQKVSAGM', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    emit(req.body);
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

function emit(body) {
    io.emit("donate", body)
}
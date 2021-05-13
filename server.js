const express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    port = process.env.PORT || 80,
    WebSocket = require('ws'),
    wss = new WebSocket.Server({ noServer: true, path: '/websocket' }),
    server = app.listen(port, () => console.log(`Server is live at ${port}`));
app.use(bodyParser.json());

var current_users = 0,
    total_users = 0;

wss.on('connection', (ws, req) => {
    total_users++;
    current_users++;
    console.log(`Online: ${current_users}, Total: ${total_users}`);
    ws.send("Connection Sucessful");
});

wss.on('close', function() {
    current_users--;
    console.log(`Online: ${current_users}`);
});

app.post("/POST/rally/creatorcoin/donate/OARPGGRRBPMKSIES", (req, res) => {
    let payload = req.body;
    console.log(payload);
    res.sendStatus(200).send(payload)
    echo(payload);
});
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    });
});

function echo(webhook) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(webhook));
    });
};
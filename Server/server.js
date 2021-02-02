const express = require('express'),
      bodyParser = require("body-parser"),
      app = express(),
      WebSocket = require('ws'),
      wss = new WebSocket.Server({ noServer: true }),
      server = app.listen(3000, () => console.log('Server is live at 3000'));

      app.use(bodyParser.json());

var current_users = 0
    total_users = 0
//WS
wss.on('connection', (ws, req) =>{
    total_users ++;
    current_users ++;
    console.log(`Client Connected, Total Online: ${current_users}`);
    ws.send("Connection Sucessful");
    ws.on('close', function () { 
        current_users --;
        console.log(`Client Disconnected, Total Online: ${current_users}`)
    });
});
// SERVER
app.post("/POST/rally/creatorcoin/donate", (req, res) => {
    let payload = req.body
    console.log(payload);
    res.status(200);
    res.send(payload);
    echo(payload);
});
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request);
  });
});
//
function echo(webhook){
    wss.clients.forEach(function each(client){
        client.send(JSON.stringify(webhook));
    });
};
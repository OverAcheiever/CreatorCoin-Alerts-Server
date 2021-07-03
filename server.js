var fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  path: "/websocket",
  cors: {
    origins: "*:*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());


const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendStatus(401);
});

app.get("/api/code/alerts", (req, res) => {
  fs.readFile("alerts.txt", "utf8", function (err, data) {
    res.send({
      version: 2.0,
      code: data
     });
  });
});

app.post("/POST/rally/creatorcoin/donate/OARPGGRRBPMKSIES", (req, res) => {
   res.sendStatus(200);
   payload = req.body.data;
   if (payload.showUsername == false) {
     payload.fromUsername = "null";
   }
   if (payload.showMemo == false) {
     payload.memo = "";
   }
   req.body.data = payload;
   emit(req.body, "donation");
   console.log(req.body);
});

app.post("/POST/rally/creatorcoin/purchase/7ZLUQH7BDQKVSAGM", (req, res) => {
  res.sendStatus(200);
  payload = req.body.data
  console.log(payload.showUsername)
  if (payload.showUsername == false) {
    payload.fromUsername = "null";
  }
  if (payload.showMemo == false) {
    payload.memo = "";
  }
  req.body.data = payload;
  emit(req.body, "purchase");
  console.log(req.body);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

function emit(body, eventType) {
  io.emit(eventType, body);
}

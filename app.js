const express = require("express"); // 설치한 express 모듈 불러오기
const socket = require("socket.io"); // 설치한 socket.io 모듈 불러오기
const http = require("http"); // Node.js 기본 내장 모듈 불러오기
const path = require("path"); // Node.js 기본 내장 모듈 불러오기

const app = express(); // express 객체 생성
const server = http.createServer(app); // express http 서버 생성
const io = socket(server); // 생성된 서버를 socket.io에 바인딩

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, "src")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "src/js/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(8080, function () {
  // 서버를 8080 포트로 listen
  console.log("서버 실행 중..");
});

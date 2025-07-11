const http = require("http");

const server = http.createServer((_, res), () => {
  console.log("ok");
  res.end("ok");
});

server.listen(3000, () => {
  console.log("Server is running.");
});

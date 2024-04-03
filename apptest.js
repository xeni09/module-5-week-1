const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("hello world");
});
app.get("/hello2", (req, res) => {
  res.json({ message: "hello world" });
});

app.get("/hello3", (req, res) => {
  const name = req.query.name;
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

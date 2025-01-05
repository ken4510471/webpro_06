"use strict";
const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// APIエンドポイント
app.post("/house", (req, res) => {
  res.json({ message: ["ハンバーグ","卵焼き","カップラーメン"] });
});

app.post("/outside", (req, res) => {
  res.json({ message: ["サイゼリヤ","バーガーキング","焼き肉"] });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
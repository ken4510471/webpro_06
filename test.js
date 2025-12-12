const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let music = [
  { id:1, code:"1", name:"a"},
  { id:2, code:"2", name:"i"},
  { id:3, code:"3", name:"u"},
  { id:4, code:"4", name:"e"},
  { id:5, code:"5", name:"o"},
  { id:6, code:"6", name:"k"},
];

app.get("/music", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1_01', { data: music });
});

// Edit
app.get("/music/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = music[ number ];
  res.render('music_edit', {id: number, data: detail} );
});

app.get("/music/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = music[ number ];
  res.render('music_detail', {id: number, data: detail} );
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

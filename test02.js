const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let game = [
  { id:1, code:"1", name:"ARC Raiders",kaihatu:"Embark Studios",ririsu:"2025年10月30日"},
  { id:2, code:"2", name:"Life is Strange",kaihatu:"Don't Nod",ririsu:"2015年1月30日"},
  { id:3, code:"3", name:"METAL GEAR SOLID V: THE PHANTOM PAIN",kaihatu:"KONAMI",ririsu:"2015年年9月2日"},
  { id:4, code:"4", name:"Hand Simulator",kaihatu:"HFM Games",ririsu:"2017年7月19日"},
];

//一覧
app.get("/game", (req, res) => {
  res.render('game', { data: game });
});

//追加
app.get("/game/create", (req, res) => {
  res.redirect('/public/game_new.html');
});
app.post("/game", (req, res) => {
  const id =game.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const kaihatu = req.body.kaihatu;
  const ririsu = req.body.ririsu;
  game.push( { id: id, code: code, name: name, kaihatu: kaihatu, ririsu: ririsu } );
  console.log( game );
  res.render('game', {data: game} );
});

//詳細
app.get("/game/:number", (req, res) => {
  const number = req.params.number;
  const detail = game[ number ];
  res.render('game_detail', {id: number, data: detail} );
});

// 編集
app.get("/game/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = game[ number ];
  res.render('game_edit', {id: number, data: detail} );
});
// 更新
app.post("/game/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  game[req.params.number].name = req.body.name;
  game[req.params.number].kaihatu = req.body.kaihatu;
  game[req.params.number].ririsu = req.body.ririsu;
  console.log( game );
  res.redirect('/game' );
});

//削除
app.get("/game/delete/:number", (req, res) => {
  game.splice( req.params.number, 1 );
  res.redirect('/game' );
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

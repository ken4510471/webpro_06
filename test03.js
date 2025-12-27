const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let food = [
  { id:1, code:"1", name:"餃子",janru:"中華"},
  { id:2, code:"2", name:"ハンバーガー",janru:"ファストフード"},
  { id:3, code:"3", name:"ラーメン",janru:"中華"},
  { id:4, code:"4", name:"寿司",janru:"和風"},
];

//一覧
app.get("/food", (req, res) => {
  res.render('food', { data: food });
});

//追加
app.get("/food/create", (req, res) => {
  res.redirect('/public/food_new.html');
});
app.post("/food", (req, res) => {
  const id =food.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const janru = req.body.janru;
  food.push( { id: id, code: code, name: name, janru: janru } );
  console.log( food );
  res.render('food', {data: food} );
});

//詳細
app.get("/food/:number", (req, res) => {
  const number = req.params.number;
  const detail = food[ number ];
  res.render('food_detail', {id: number, data: detail} );
});

// 編集
app.get("/food/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = food[ number ];
  res.render('food_edit', {id: number, data: detail} );
});
// 更新
app.post("/food/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  food[req.params.number].name = req.body.name;
  food[req.params.number].kaihatu = req.body.kaihatu;
  food[req.params.number].ririsu = req.body.ririsu;
  console.log( food );
  res.redirect('/food' );
});

//削除
app.get("/food/delete/:number", (req, res) => {
  food.splice( req.params.number, 1 );
  res.redirect('/food' );
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

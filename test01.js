const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let music = [
  { id:1, code:"1", name:"あぁ、もう。",sakusi:"石原慎也",sakkyoku:"Saucy Dog",ririsu:"2021年12月17日"},
  { id:2, code:"2", name:"シーグラス",sakusi:"石原慎也",sakkyoku:"Saucy Dog",ririsu:"2020年7月15日"},
  { id:3, code:"3", name:"魔法にかけられて",sakusi:"石原慎也",sakkyoku:"Saucy Dog",ririsu:"2022年3月25日"},
  { id:4, code:"4", name:"オードトワレ",sakusi:"うきょう",sakkyoku:"うきょう",ririsu:"2021年4月26日"},
  { id:5, code:"5", name:"リタ",sakusi:"浜口飛雄也",sakkyoku:"浜口飛雄也・坂知哉",ririsu:"2021年10月1日"},
  { id:6, code:"6", name:"青い栞",sakusi:"尾崎雄貴",sakkyoku:"尾崎雄貴",ririsu:"2011年6月15日"},
];

//一覧
app.get("/music", (req, res) => {
  res.render('music', { data: music });
});

//追加
app.get("/music/create", (req, res) => {
  res.redirect('/public/music_new.html');
});
app.post("/music", (req, res) => {
  const id = music.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const sakusi = req.body.sakusi;
  const sakkyoku = req.body.sakkyoku;
  const ririsu = req.body.ririsu;
  music.push( { id: id, code: code, name: name, sakusi: sakusi, sakkyoku: sakkyoku, ririsu: ririsu } );
  console.log( music );
  res.render('music', {data: music} );
});

//詳細
app.get("/music/:number", (req, res) => {
  const number = req.params.number;
  const detail = music[ number ];
  res.render('music_detail', {id: number, data: detail} );
});

// 編集
app.get("/music/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = music[ number ];
  res.render('music_edit', {id: number, data: detail} );
});
// 更新
app.post("/music/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  music[req.params.number].name = req.body.name;
  music[req.params.number].sakusi = req.body.sakusi;
  music[req.params.number].sakkyoku = req.body.sakkyoku;
  music[req.params.number].ririsu = req.body.ririsu;
  console.log( music );
  res.redirect('/music' );
});

// 削除確認画面を表示
app.get("/music/delete_confirm/:number", (req, res) => {
  const number = req.params.number;
  const detail = music[number];
  
  // 確認画面を表示
  res.render('music_delete_confirm', { id: number, data: detail });
});

// 削除
app.post("/music/delete/:number", (req, res) => {
  music.splice(req.params.number, 1);
  res.redirect('/music');
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

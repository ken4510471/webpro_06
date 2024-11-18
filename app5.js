const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = '吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});


app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win||0 );
  let total = Number( req.query.total||0 );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement;
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  if(hand ==='グー' && cpu ==='チョキ'){
  judgement = '勝ち';
  win += 1;
  total += 1;
  }else if(hand==='グー' && cpu ==='グー'){
  judgement = 'あいこ';
  win += '';
  total += 1;
  }else if(hand==='グー' && cpu ==='パー'){
  judgement = '負け';
  win += '';
  total += 1;
  }


  if(hand ==='チョキ' && cpu ==='パー'){
  judgement = '勝ち';
  win += 1;
  total += 1;
  }else if(hand==='チョキ' && cpu ==='チョキ'){
  judgement = 'あいこ';
  win += 0;
  total += 1;
  }else if(hand==='チョキ' && cpu ==='グー'){
  judgement = '負け';
  win += 0;
  total += 1;
  }


  if(hand ==='パー' && cpu ==='グー'){
  judgement = '勝ち';
  win += 1;
  total += 1;
  }else if(hand==='パー' && cpu ==='パー'){
  judgement = 'あいこ';
  win += 0;
  total += 1;
  }else if(hand==='パー' && cpu ==='チョキ'){
  judgement = '負け';
  win += 0;
  total += 1;
  }


  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/game", (req, res) => {
  let game = req.query.game;
  let win = Number( req.query.win||0 );
  let total = Number( req.query.total||0 );
  console.log( {game, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'モンハン';
  else if( num==2 ) cpu = 'マイクラ';
  else cpu = 'APEX';
  let judgement;
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  if(game ==='モンハン' && cpu ==='モンハン'){
  judgement = 'おめでとう';
  win += 1;
  total += 1;
  }else if(game==='モンハン' && cpu ==='マイクラ'){
  judgement = '残念　勉強してください';
  win += '';
  total += 1;
  }else if(game==='モンハン' && cpu ==='APEX'){
  judgement = '残念　勉強してください';
  win += '';
  total += 1;
  }

  if(game ==='マイクラ' && cpu ==='マイクラ'){
    judgement = 'おめでとう';
    win += 1;
    total += 1;
    }else if(game==='マイクラ' && cpu ==='モンハン'){
    judgement = '残念　勉強してください';
    win += '';
    total += 1;
    }else if(game==='マイクラ' && cpu ==='APEX'){
    judgement = '残念　勉強してください';
    win += '';
    total += 1;
    } 

  if(game ==='APEX' && cpu ==='APEX'){
    judgement = 'おめでとう';
    win += 1;
    total += 1;
    }else if(game==='APEX' && cpu ==='モンハン'){
    judgement = '残念　勉強してください';
    win += '';
    total += 1;
    }else if(game==='APEX' && cpu ==='マイクラ'){
    judgement = '残念　勉強してください';
    win += '';
    total += 1;
   }
  const display = {
    your: game,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'game', display );
});

app.get("/lunch", (req, res) => {
  let lunch = req.query.lunch;
  let win = Number( req.query.win||0 );
  let total = Number( req.query.total||0 );
  console.log( {lunch, win, total});
  const num = Math.floor( Math.random() * 2 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '肉';
  else if( num==2 ) cpu = '魚';
  let judgement;
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  if(lunch ==='肉' && cpu ==='肉'){
  judgement = 'おめでとう　ステーキ食べていいよ';
  win += 1;
  total += 1;
  }else if(lunch==='肉' && cpu ==='魚'){
  judgement = '昼ご飯抜きです';
  win += '';
  total += 1;
  }

  if(lunch ==='魚' && cpu ==='魚'){
    judgement = 'おめでとう　寿司食べていいよ';
    win += 1;
    total += 1;
    }else if(lunch==='魚' && cpu ==='肉'){
    judgement = '昼ご飯抜きです';
    win += '';
    total += 1;
    }

  const display = {
    your: lunch,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'lunch', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

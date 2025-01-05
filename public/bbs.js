"use strict";//文法厳しめ

let number=0;//投稿件数がいくつかをカウント
const bbs = document.querySelector('#bbs');//書き込みの参照を変数に代入
document.querySelector('#post').addEventListener('click', () => {//投稿ボタンが押されたという処理
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode　　　相手に送るもの
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {//実行
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";//投稿件数を表示
    });
});

document.querySelector('#check').addEventListener('click', () => {//新しい投稿をチェックし持ってくる
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {//numberがクライアントの件数，valueがサーバーの受け取った件数
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {//表示する部分
                number += response.messages.length;
                for( let mes of response.messages ) {//response.messagesの中の指定された番号の内容をmesに送る
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');//1件分の投稿の枠
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );//coverの中にnameをつける
                    cover.appendChild( mes_area );//coverの中にmesをつける

                    bbs.appendChild( cover );//bbsにcoverをつける
                }
            })
        }
    });
});


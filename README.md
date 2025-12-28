flowchart TD
    A[一覧ページ /music] -->|曲名をクリック| B[詳細ページ /music/:number]

    B -->|編集| C[編集ページ /music/edit/:number]
    C -->|更新送信| A

    A -->|追加| D[追加ページ /music/create]
    D -->|登録送信| A

    A -->|削除| E[削除確認ページ /music/delete_confirm/:number]
    E -->|削除する| F[削除処理 /music/delete/:number]
    F --> A

    E -->|キャンセル| A
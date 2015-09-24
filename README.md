# JSer.info-editor [![Build Status](https://travis-ci.org/jser/jser.info-editor.svg?branch=master)](https://travis-ci.org/jser/jser.info-editor)


[JSer.infoアーカイブ](http://jser.info/jser.info/) のエディタアプリです。

- node-webkitアプリ

## Installation

[https://github.com/jser/jser.info-editor/releases/latest](https://github.com/jser/jser.info-editor/releases/latest) からバイナリをダウンロード

Gitで [JSer.infoのデータリポジトリ](https://github.com/jser/jser.info.git) を好きな場所にcloneしておく。

```
git clone https://github.com/jser/jser.info.git /path/to/jser.info
```

起動したら、"設定"から `/path/to/jser.info`のパスを指定します。

リロードすると、一番新しいjser.infoのデータJSONが読み込まれます。

## Feature

- 本文をダブルクリックで編集
    - Ctrl+Enterで保存、Escでキャンセル
    - [technical-word-rules](https://github.com/azu/technical-word-rules " technical-word-rules")を使ったLint
- 関連サイトを編集
    - リンクをクリックすると編集モードへ
    - titleとurlを持つJSONを入れると反映される
    ```json
          { "title" : "jser/jser.info", "url" : "https://github.com/jser/jser.info"}
    ```
    - 空にすると削除
- Commit
    - マシンの`git`コマンドを使って変更をコミットします
- Push
    - マシンの`git`コマンドを使って`gh-pages`をpushします。


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

# Claude Desktop 自動承認ガイド

## 概要

Claude Desktop で毎回表示される "Allow for this chat" ダイアログを自動承認する主な方法は大きく５系統あります。

1. **Chrome DevTools で JS スニペットを走らせる王道パターン**
2. **claude_desktop_config.json や一部 MCP サーバーの --auto‑approve オプションに承認リストを直接書く設定型**
3. **Electron アプリに JS をインジェクトする CLI ツールで起動時に自動化するインジェクション型**
4. **--remote‑debugging‑port に接続して Playwright／Puppeteer から遠隔クリックするデバッガ型**
5. **AppleScript・AutoHotkey など OS レベルの UI 自動化スクリプトでひたすらクリックさせる外部オートメーション型**

## 1. DevTools に JS スニペットを注入して自動クリック

### 1-1. DevTools を開けるようにする

- developer_settings.json に `{"allowDevTools": true}` を書く
  - macOS: `~/Library/Application Support/Claude/`
  - Windows: `%APPDATA%\Claude\`
- 開き方:
  - Mac: `Cmd + Opt + Shift + I`
  - Win: `Ctrl + Shift + Alt + I`
  - 2つの DevTools が開くので URL に https://claude.ai を含む方を選択する

### 1-2. 代表的なワンライナー（GitHub gist）

```js
// 省略版 – 本体は gist 参照
const trustedTools = ["read_file","search_files"];            // ←安全なツールだけに絞る
new MutationObserver(()=>{ … if(allowButton) allowButton.click() }).observe(document.body,{childList:true,subtree:true});
```

スニペット全量と更新履歴は [gist claude-desktop-auto-allow-everything-mcp.js](https://gist.github.com/) を参照

### 1-3. スニペットを毎回貼らずに済ませる裏ワザ

DevTools > Sources > Snippets に保存しておけば、起動後右クリック→Run だけで再利用可能

### 1-4. メリット / デメリット

| メリット | デメリット |
|---------|-----------|
| 標準機能だけで完結／柔軟にフィルタ | アプリ再起動ごとに Snippet 実行が必要／UI が変わるとセレクタ修正が必要 |

## 2. autoApprove フィールドで「設定ファイル側」から無人承認

一部の MCP サーバー（例：Git MCP、ImageGen MCP）は claude_desktop_config.json か --auto-approve CLI フラグでツール名を列挙すると、クライアント側のダイアログ自体が出ません。

```jsonc
"mcpServers": {
  "git": {
    "command": "/usr/local/bin/git-mcp-go",
    "args": ["serve","-r=/repo","--auto-approve=git_status,git_log"]
  }
}
```

**注意**: まだ全サーバー／全バージョンで正式サポートではなく、ImageGen MCP など限られた実装のみ成功報告がある段階です

## 3. Electron アプリごとコード注入して「起動時に常駐」

Rust 製 CLI electron‑injector を使うと、Claude Desktop を起動すると同時に JS ファイルを差し込めるため、毎回 DevTools を開く手間を省けます。

```bash
cargo install electron-injector
electron-injector --script=/path/autoApprove.js /Applications/Claude.app
```

- **長所**: スタートアップ自動化・DevTools 表示不要
- **短所**: 署名検証のある OS では gatekeeper 例外設定が必要／アップデートで壊れやすい

## 4. CDP (Chrome DevTools Protocol) で外部からクリック

Claude Desktop を --remote-debugging-port=9222 付きで起動 → Playwright / Puppeteer から DOM を監視し Allow‑Button.click()。

- **長所**: スクリプトを外部プロセスに分離できる／テスト自動化と相性◎
- **短所**: デバッグポートを公開するためセキュリティ上の面倒が増える

## 5. OS レベルの UI オートメーション

### 5-1. macOS (AppleScript/Bash)

GitHub の claude-autoclicker.sh は osascript で 1 秒おきに Accessibility API からボタンを探しクリック

### 5-2. Windows (AutoHotkey)

AutoHotkey で同等の "IfWinExist → ControlClick" ループを書く方法がフォーラムで議論されています

- **長所**: Claude の内部実装変更に影響されにくい
- **短所**: マウス操作と競合／多重クリックで誤作動する可能性大

## 6. 安全に運用するためのチェックリスト

| チェック項目 | 推奨アクション |
|------------|--------------|
| ツール権限 | read‑only ツールだけを自動承認する（trustedTools or allow‑read-only） |
| 環境 | 重要ファイルを扱う場合は VM／専用ユーザーで Claude を実行する |
| アップデート | UI 変更でセレクタが壊れやすいので、スクリプトは gist の最新版へ随時差し替え |
| ログ監査 | ~/Library/Logs/Claude/mcp*.log で実行履歴を定期確認 |

## まとめと選択ガイド

- **手軽さ重視** → DevTools スニペット
- **毎日起動するなら** → Snippet 保存 + electron‑injector
- **CI／自動テスト用途** → CDP + Playwright/Puppeteer
- **特殊サーバーのみ許可したい** → autoApprove フラグを試す
- **GUI レイヤーで全部片付けたい** → AppleScript / AutoHotkey

どの方式でも「書き込み系ツールの無人承認は最後の手段」に留め、まずは read‑only な MCP に限定して運用することを強く推奨します。
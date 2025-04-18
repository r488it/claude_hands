# Claude Hands (日本語版)

<p align="center">
  <img src="assets/logo.png" width="200"/>
  <img src="assets/logo2.png" width="200"/>
</p>

[English](README.md) | 日本語

[![GitHub stars](https://img.shields.io/github/stars/r488it/claude_hands?style=social)](https://github.com/r488it/claude_hands/stargazers)
&ensp;
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) &ensp;   

Claude Handsは、Manusの再現実装をClaude DesktopとMCPを活用して再現したプロジェクトです。

## 更新情報
2025.4.19 reviewing directories   
2025.4.18 cross-platform support   
2025.3.29 Browser operation supported.   
2025.3.29 ChatGPT Desktop supported. chatgpt_mcp_agent.config.yaml

## 推奨モデル
- Claude 3.7 Sonnet
- Claude 3.7 Sonnet think mode

## 機能

- Claude Code開発用の事前設定されたDocker環境
- 情報検索を強化するTavily検索統合
- MCP（Model Control Protocol）インターフェースを通じてClaude Desktopと互換性あり
- グラフィックレコーディングスタイルのインフォグラフィック生成機能

## 前提条件

- DockerとDocker Compose
- Claude Desktopアプリケーション
- Tavily APIキー

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/r488it/claude_hands.git
cd claude_hands
```

### 2. 環境変数の設定

ルートディレクトリに`.env`ファイルを作成します：

```bash
touch .env
```

`.env`ファイルにTavily APIキーとワークスペースパスを追加します：

```
TAVILY_API_KEY=your_tavily_api_key_here
WORKSPACE_PATH=/path/to/your/workspace
```

### 3. サービスの起動

```bash
docker-compose up -d
```

このコマンドにより：
- 必要なDockerイメージがまだ利用可能でない場合はプルされます
- Claude CodeとTavilyサービスが起動します
- 設定されたポートでサービスが公開されます

## Claude Desktopとの接続

1. `claude_desktop_config.json`ファイルをClaude Desktop設定ディレクトリにコピーします
2. Claude Desktopを再起動します
3. これでMCPサーバーをClaude Desktopで使用できるようになります

## 使用方法

1. 新しいプロジェクトを作成する
<div align="center" style="display: flex; gap: 20px;">
    <img src="assets/01_make_project.png" alt="プロジェクト作成" width="300" />
</div>

2. プロンプトを設定する
<div align="center" style="display: flex; gap: 20px;">
    <img src="assets/02_set_prompt.png" alt="プロンプト設定" width="300" />
</div>

3. ナレッジテンプレートを追加する（オプション）
<div align="center" style="display: flex; gap: 20px;">
    <img src="assets/03_set_knowledge.png" alt="ナレッジ追加" width="300" />
</div>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=r488it/claude_hands&type=Date)](https://www.star-history.com/#r488it/claude_hands&Date)
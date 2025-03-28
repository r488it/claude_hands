# Claude Hands

[日本語版のREADME](./README.ja.md)

Claude Hands is a repository that recreates the Manus implementation using Claude Desktop and MCP (Model Control Protocol).

## Features

- Pre-configured Docker environment for Claude Code development
- Tavily search integration for enhanced information retrieval
- Compatible with Claude Desktop through MCP (Model Control Protocol) interfaces
- Graphic recording-style infographic generation capabilities

## Prerequisites

- Docker and Docker Compose
- Claude Desktop application
- Tavily API key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/r488it/claude_hands.git
cd claude_hands
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your Tavily API key to the `.env` file:

```
TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Update Docker Volume Paths

Edit the `docker-compose.yml` file to update the volume paths to match your system:

```yaml
volumes:
  - /path/to/your/workspace:/workspace
```

### 4. Start the Services

```bash
docker-compose up -d
```

This command will:
- Pull the required Docker images if not already available
- Start the Claude Code and Tavily services
- Expose the services on the configured ports

## Connecting with Claude Desktop

1. Copy the `claude_desktop_config.json` file to your Claude Desktop configuration directory
2. Restart Claude Desktop
3. You should now be able to use the MCP servers through Claude Desktop

## Usage

- Use Claude Code for AI development tasks
- Access the Tavily API for enhanced search capabilities
- Create graphic recording-style infographics using the knowledge template

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
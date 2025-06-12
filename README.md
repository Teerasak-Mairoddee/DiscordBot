# DiscordBot

A lightweight chat bot built for Discord that helps users pull real-time coin prices, streamlining market decisions and sparking discussion within the community.

## Features

- Use simple Discord commands to request the latest price of a cryptocurrency
- Leverages public APIs and cross-references a Google Sheet to match user-friendly keys with actual coin IDs
- Returns prices along with emojis to show whether the price has risen 📈 or fallen 📉
- Responds with a humorous reply when it doesn't recognise a command
- Designed to be editable via Google Sheets, allowing non-coders to add or modify coin keys easily

## Why It Exists

As part of our crypto investing process, my flatmate often needs to research a coin's price and key events before making decisions. This usually means logging into multiple sites and digging through news. I created this bot to simplify that step.

Now, anyone in our Discord server can:
- Check prices instantly
- Get notified in real time
- Collaborate by discussing price changes and relevant news

By bringing the process to Discord, we keep everything in one place, making teamwork and investing decisions more efficient and social.

## Getting Started

To run this bot yourself:

1. Clone the repo:
   ```bash
   git clone https://github.com/Teerasak-Mairoddee/DiscordBot.git
   ```

2. Set up your environment variables for:
   - Discord bot token
   - API keys (e.g. CoinGecko or similar)
   - Google Sheets access credentials

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the bot:
   ```bash
   node index.js
   ```

## Tech Stack

- **Node.js** for the backend logic
- **Discord.js** for interfacing with the Discord API
- **CoinGecko API** (or another public crypto API) for price data
- **Google Sheets API** to maintain editable coin-key mappings

## Future Ideas

- Add chart previews or 24h change percentages
- Fetch top gainers or losers automatically
- Alert the group when a coin breaks a threshold
- Integrate trending news or tweets for context

## Contributing

Pull requests are welcome! If you'd like to suggest a feature or report a bug, please open an issue.

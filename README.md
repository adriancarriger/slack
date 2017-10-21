# Slack autoresponder (for fun)

[![Dependency Status](https://img.shields.io/david/adriancarriger/slack/master.svg?maxAge=60)](https://david-dm.org/adriancarriger/slack)
[![Github file size](https://img.shields.io/github/size/adriancarriger/slack/src/index.js.svg)](src/index.js)
[![Pretty Serious](https://img.shields.io/badge/🤣-pretty%20serious-ff69b4.svg)](https://github.com/adriancarriger/slack)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

🎉 Slackbot + Napoleon Dynamite! 🎉

[![I guess you could say things are getting pretty serious](https://raw.githubusercontent.com/adriancarriger/slack/master/docs/pretty-serious.gif)](https://github.com/adriancarriger/slack)

## Usage

- Paste [`src/index.js`](src/index.js) into the console of the [Slack web UI](https://slack.com/)
- Navigate to your desired Slack channel
- Paste `initCurrent('optional initial message');` into the console to init current channel

## Init a specific channel

- get channel id: `getChannel();`
- init channel by id: `init('channel-id', 'optional initial message')`

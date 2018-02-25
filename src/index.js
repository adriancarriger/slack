// Config
const averageResponse = 4;
// Variables
const acceptedChannels = [];
const options = [
  'Your mom goes to college',
  'Heck yes ! I\'d vote for you.',
  'I don\'t even have any skills.',
  'bring me my Chapstick!',
  'Gosh!',
  'Is that what you\'re trying to do. Ruin my life and make me look like a freakin\' idiot!',
  'What\'s Grandma doing at the flippin\' sand dunes!?',
  'Whatever I feel like I wanna do, GOSH.',
  'I caught you a delicious bass.',
  'Can I use your guyses phone?',
  'I see you\'re drinking one percent. Is that cause you think you\'re fat?',
  'Can you bring me my chapstick?',
  'Do your chickens have large talons?',
  'The worst day of my life. What do you think?',
  ' That\'s my ride.',
  'How long did it take you to grow that mustache?',
  'Build her a cake or something.',
  'Can I use your guyses phone?',
  'Just borrow some from the school nurse. I know she has like five sticks in her drawer.',
  'Do the chickens have large talons?',
  'I spent it with my uncle in Alaska hunting wolverines!',
  'It took me like three hours to finish the shading on your upper lip. It\'s probably the best drawing I\'ve ever done.',
  'You should probably pick up all the stuff you left on my lawn, because it\'s taking up so much room in my backpack I can\'t fit my nunchucks.',
  'I like your sleeves. They\'re real big.',
  'Fine! Go ahead!',
  'So, you got my back and everything, right?',
  'I guess you could say things are getting pretty serious.'
];

const config = {
  useGif: false
};

let gifOptions = [
  'random'
];
let paused = false;

const onMessageOld = TS.ms.msg_handlers.message;
TS.ms.msg_handlers.message = onMessage;

function onMessage(message) {
  console.log(message);
  onMessageOld(message);
  think(message);
}

function getChannel() {
  return TS.shared.legacyGetActiveModelOb().id;
}

function initCurrent(message) {
  init(getChannel(), message)
}

function think(message) {
  if (paused || !acceptedChannels.includes(message.channel)) { 
    console.log(`Not sending a message to ${message.user} using channel ${message.channel}`);
    return;
  }
  if (ignoreMessage(message)) { return; }
  setTimeout(() => {
    config.useGif ? sendGif(message.channel, getGifSearch()) : send(message.channel, getMessage());
  }, averageResponse * 2 * 1000 * Math.random());
}

function send(channel, text) {
  TS.client.ui.sendMessage(TS.shared.legacyGetActiveModelOb(channel), text);
}

function sendGif(channel, searchText) {
  sendSlashCommand(channel, `/gif ${searchText}`);
}

function sendSlashCommand(channel, command) {
  TS.client.ui.sendSlashCommand(TS.shared.legacyGetActiveModelOb(channel), command);
}

function sendSlashCurrent(command) {
  sendSlashCommand(getChannel(), command);
}

function toggle() {
  paused = !paused;
}

function init(channel, text) {
  acceptedChannels.push(channel);
  if (text) {
    setTimeout(() => send(channel, text), 1 * 1000);
  }
}

function getMessage() {
  return randomIndex(options);
}

function useGif(gifOption = 'random') {
  config.useGif ? gifOptions = [ gifOption ] : config.useGif = true, gifOptions = [ gifOption ];
}

function getGifSearch() {
  return randomIndex(gifOptions);
}

function randomIndex(inputArray) {
  const index = Math.round( Math.random() * (inputArray.length - 1) );
  return inputArray[index];
}

function ignoreMessage(message) {
  const result = message.subtype === 'bot_message' || message.user === TS.boot_data.user_id;
  console.log(`ignore message?`, result, message.subtype, message.user, TS.boot_data.user_id)
  return result;
}

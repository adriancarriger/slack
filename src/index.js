// Config
const averageResponse = 4;
// Variables
const acceptedChannels = [];
let paused = false;

const onMessageOld = TS.ms.msg_handlers.message;
TS.ms.msg_handlers.message = onMessage;

function onMessage(message) {
  onMessageOld(message);
  think(message);
}

function getChannel() {
  return TS.shared.getActiveModelOb().id
}

function initCurrent(message) {
  init(getChannel(), message)
}

function think(message) {
  if (paused || !acceptedChannels.includes(message.channel)) { 
    console.log(`Not sending a message to ${message.user} using channel ${message.channel}`);
    return;
  }
  setTimeout(() => send(message.channel, getMessage()), averageResponse * 2 * 1000 * Math.random());
}

function send(channel, text) {
  TS.client.ui.sendMessage(TS.shared.getModelObById(channel), text)
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
  const index = Math.round( Math.random() * (options.length - 1) );
  return options[index];
}

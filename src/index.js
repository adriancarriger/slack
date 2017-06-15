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
  document.getElementById('msg_input').querySelector('p').innerHTML = 'This message was not really sent.'
  return new Promise(r => {
    setTimeout(() => {
      let channel;
      const onMessageOld = TS.ms.send;
      TS.ms.send = (e, t, n) => channel = e.channel;
      TS.view.submit();
      TS.ms.send = onMessageOld;
      r(channel);
    });
  });
}

function initCurrent(message) {
  getChannel().then(channel => init(channel, message))
}

function think(message) {
  if (paused || !acceptedChannels.includes(message.channel)) { 
    console.log(`Not sending a message to ${message.user} using channel ${message.channel}`);
    return;
  }
  message.text = getMessage();
  setTimeout(() => send(message), averageResponse * 2 * 1000 * Math.random());
}

function send(message) {
  setTimeout(() => TS.ms.send(message));
}

function toggle() {
  paused = !paused;
}

function init(channel, text) {
  acceptedChannels.push(channel);
  if (text) {
    setTimeout(() => send({
      text: text,
      channel: channel,
      type: 'message'
    }), 1 * 1000);
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
    'Freakin\' idiot.',
    '..you fat lard, come get some DINNER!',
    'What\'s Grandma doing at the flippin\' sand dunes!?',
    'Whatever I feel like I wanna do, GOSH.',
    'I caught you a delicious bass.',
    'Can I use your guyses phone?',
    'You guys are retarded!',
    'I see you\'re drinking one percent. Is that cause you think you\'re fat?',
    'Can you bring me my chapstick?',
    'Do your chickens have large talons?',
    'I\'m gonna call the cops on you!',
    'The worst day of my life. What do you think?'
  ];
  const index = Math.round( Math.random() * (options.length - 1) );
  return options[index];
}

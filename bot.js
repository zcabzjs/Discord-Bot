var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var Promise = require('promise');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var spam = false;
var interval = 0;
var rouletteCounter = [1,2,3,4,5,6];
var luckyNumber = null;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    // var channel = bot.channels[channelID];
    var messageholder = message;

    if (message.substring(0, 1) == '!') {
        var currentMessage = message.substring(1);
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = currentMessage.slice(cmd.length+1);
        //args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'spam':
                if(args != '' && interval == 0){
                  interval = setInterval(function(){
                    bot.sendMessage({
                        to: channelID,
                        message: args
                    });
                  }, 1000);
                }
            break;
            case 'stopspam':
                clearInterval(interval);
                interval = 0;
            break;
            case 'bestperson':
                bot.sendMessage({
                    to: channelID,
                    message: 'Zi Jian'
                });
            break;
            case 'toxic':
                bot.sendMessage({
                    to: channelID,
                    message: 'Stop walking down top Larry!'
                });
            break;
            case 'pushups':
                var onlineusers = [];
                for(u in bot.users){
                  var user = bot.users[u];
                  if(!(user.bot == true)){
                    onlineusers.push(user.username);
                  }
                }
                var randIndex = Math.round(Math.random() * onlineusers.length);
                if(randIndex == onlineusers.length){
                  randIndex = onlineusers.length - 1;
                }
                bot.sendMessage({
                    to: channelID,
                    message: onlineusers[randIndex] + ' do your god damn pushups!'
                    // message: onlineusers
                });

            break;
            case 'roulette':
                var monkaS = '<:monkaS:422783651558850560>'
                var notlikethis = '<:NotLikeThis:422987017933291520>'
                var pogchamp = '<:PogChamp:423079693986693120>'
                var seemsgood = '<:SeemsGood:422988138185621508>'
                if(rouletteCounter.length == 6){
                  luckyNumber = Math.ceil(Math.random() * 6);
                }
                if(args == ''){
                  setTimeout(function(){
                    bot.sendMessage({
                        to: channelID,
                        message: 'Type in !roulette <number> to test your luck.'
                    })
                  }, 0);
                  setTimeout(function(){
                    bot.sendMessage({
                        to: channelID,
                        message: rouletteCounter
                    });
                  }, 1000);
                  // bot.sendMessage({
                  //     to: channelID,
                  //     message: rouletteCounter
                  // });
                  // bot.sendMessage({
                  //     to: channelID,
                  //     message: 'Type in !roulette <number> to test your luck.'
                  // });
                }
                else{
                  if(!isNaN(args) && rouletteCounter.includes(parseInt(args))){
                    if(parseInt(args) == luckyNumber){
                      setTimeout(function(){
                        bot.sendMessage({
                            to: channelID,
                            message: monkaS + ' ' + user + ' bravely pulls the trigger. ' + monkaS
                        });
                      }, 0);
                      setTimeout(function(){
                        bot.sendMessage({
                            to: channelID,
                            message: monkaS + ' and.... ' + monkaS
                        });
                      }, 2000);
                      setTimeout(function(){
                        bot.sendMessage({
                            to: channelID,
                            message: notlikethis + ':gun: BOOM!!! Guess it\'s about time ' + user + '\'s luck ran out... Try again? ' + notlikethis + ':gun:'
                        });
                        resetRoulette();
                      }, 4000);
                      // setTimeout(resetRoulette, 5000);
                      // sleep(1000);
                      // bot.sendMessage({
                      //     to: channelID,
                      //     message: 'and....'
                      // });
                      // sleep(1000);
                      // bot.sendMessage({
                      //     to: channelID,
                      //     message: 'BOOM!!! Guess it\' about time ' + user + '\'s luck ran out... Try again?'
                      // });
                      // resetRoulette();
                    }
                    else{
                      setTimeout(function(){
                        bot.sendMessage({
                            to: channelID,
                            message: monkaS + ' ' + user + ' bravely pulls the trigger. ' + monkaS
                        });
                      }, 0);
                      setTimeout(function(){
                        bot.sendMessage({
                            to: channelID,
                            message:  monkaS + ' and.... ' + monkaS
                        });
                      }, 2000);
                      if(rouletteCounter.length == 2){
                        setTimeout(function(){
                          bot.sendMessage({
                              to: channelID,
                              message: pogchamp + ' ' + user + ' HAVE WON THE ROULETTE. CONGRATULATIONS FOR BEING THE LUCKIEST PERSON ALIVE!! ' + pogchamp
                          });
                          resetRoulette();
                        }, 4000);
                      }
                      else{
                        setTimeout(function(){
                          bot.sendMessage({
                              to: channelID,
                              message: seemsgood + ' ' + user + ' lives to tell the tale. Perhaps you would want to try again? ' + seemsgood
                          });
                          var index = rouletteCounter.indexOf(parseInt(args));
                          rouletteCounter.splice(index, 1);
                        }, 4000);
                        setTimeout(function(){
                          bot.sendMessage({
                              to: channelID,
                              message: rouletteCounter
                          });
                        }, 4500);
                      }

                      // bot.sendMessage({
                      //     to: channelID,
                      //     message: user + ' bravely pulls the trigger.'
                      // });
                      // sleep(1000);
                      // bot.sendMessage({
                      //     to: channelID,
                      //     message: 'and....'
                      // });
                      // sleep(1000);
                      // bot.sendMessage({
                      //     to: channelID,
                      //     message: user + ' lives to tell the tale. Perhaps you would want to try again?'
                      // });


                      // bot.sendMessage({
                      //     to: channelID,
                      //     message: rouletteCounter
                      // });
                    }
                  }
                  else{
                    bot.sendMessage({
                        to: channelID,
                        message: 'Type in !roulette <number> to test your luck.'
                    })
                  }
                }

            break;
            case 'test':
              var servers = bot.servers;
              console.log(bot.servers)
              // var server = null;
              // for(var s in servers){
              //   if(s.name == 'Ho Ho Baweng'){
              //     server = s;
              //   }
              // }
              // console.log(servers.get("name", "Ho Ho Baweng").defaultChannel);
              // console.log(user);
              // console.log(userID);
              // console.log(channelID);
              // console.log(message);
            break;
            case 'roll':
                var random = -1;
                if(args == ''){
                  random = Math.random() * 100;
                }
                else{
                  if(!isNaN(args) && parseInt(args) >= 0){
                    random = Math.random() * args;
                  }
                  else{
                    bot.sendMessage({
                        to: channelID,
                        message: 'Wrong input. Expected roll <Number>'
                    });
                  }
                }
                if(random != -1){
                  bot.sendMessage({
                      to: channelID,
                      message: user + ' rolled ' + Math.ceil(random)
                  });
                  random = -1;
                }
             break;
             case 'flip':
                var random;
                random = Math.random() * 2;
                if(random > 1){
                  bot.sendMessage({
                      to: channelID,
                      message: user + ' flipped ' + 'HEADS'
                  });
                }
                else{
                  bot.sendMessage({
                      to: channelID,
                      message: user + ' flipped ' + 'TAILS'
                  });
                }
             break;
             case 'dotabuff':
                bot.sendMessage({
                    to: channelID,
                    message: 'https://www.dotabuff.com/players/211385358'
                });
             break;
            // Just add any case commands if you want to..
         }
     }
});

function resetRoulette(){
  rouletteCounter = [1,2,3,4,5,6];
  luckyNumber = null;
}

function roulette(success, user, callback){
  bot.sendMessage({
      to: channelID,
      message: user + ' bravely pulls the trigger.'
  });
  sleep(2000);
  callback(success, user);
}
function roulette2(success, user, callback){
  bot.sendMessage({
      to: channelID,
      message: 'and....'
  });
  sleep(2000);
  callback(success, user);
}
function roulette3(success, user, callback){
  if(success){
    bot.sendMessage({
        to: channelID,
        message: user + ' lives to tell the tale. Perhaps you would want to try again?'
    });
  }
  else{
    bot.sendMessage({
        to: channelID,
        message: 'BOOM!!! Guess it\' about time ' + user + '\'s luck ran out... Try again?'
    });
    callback();
  }
}

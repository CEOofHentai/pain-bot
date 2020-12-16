const Discord  = require('discord.js');
const playObj = require('./play.js')
module.exports = {
	name: 'die',
	description: 'Clears the entire music queue and kicks the bot from the call',
	nsfw: false,
	execute(message) {
      let voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
          return message.channel.send(
            "You have to be in a voice channel to stop the music stupid"
          );
        }
      playObj.queue.length = 0;
      playObj.queueConstruct.connection.disconnect();
      playObj.queueConstruct.connection = null;
    },
	help(message) {
		message.channel.send(this.description);
	}
};
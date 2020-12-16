const Discord  = require('discord.js');
const playObj = require('./play.js');
module.exports = {
	name: 'skip',
	description: 'Skip current song in queue',
	nsfw: false,
	execute(message) {
        if (!message.member.voice.channel){
          return message.channel.send(
            "You have to be in a voice channel to skip the music retard"
          );
        }
        if (!playObj.queue.length > 0){
        return message.channel.send("No skippable song in the queue atm");
        }
        message.channel.send(`Skipping **${playObj.queue[0].title}**`)
        playObj.queueConstruct.connection.dispatcher.end();
        return;
    },
	help(message) {
		message.channel.send(this.description);
	}
};
const Discord  = require('discord.js');
module.exports = {
	name: 'update',
	description: 'Returns the most recent update Grim has made to the bot',
	nsfw: false,
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed();
		const update = '\`Low-capacity EC2 server acquired for free to host the bot on 24/7. You won\'t be able to rapid-fire commands, but it\'s 100% uptime.\`'
		exampleEmbed
      .setColor('#0099ff')
      .setAuthor('Grim', 'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4', 'https://github.com/CEOofHentai')
      .setDescription(update)
      .setFooter('More updates to come');

      message.channel.send(exampleEmbed);
    },
	help(message) {
		message.channel.send(this.description);
	}
};
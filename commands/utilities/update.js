const Discord  = require('discord.js');
module.exports = {
	name: 'update',
	description: 'Returns the most recent update Grim has made to the bot',
	nsfw: false,
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed();
		const update = '\`New command \"$summon\" has been added as the first in a series of League commands Grim plans on making. ' +
		'Add a champion name afterwards and make sure the first character is capitalized to get basic info on the champ. \n\n' +
		'Next up will be an \"$abilities\" command to see the descriptions and stat scaling on champion abilities. \n\n' +
		'Will also be updating all responses to be formatted as embeds eventually rather than plain text just cuz they look prettier.\`'
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
const fetch = require('../../node_modules/node-fetch');
const Discord  = require('discord.js');
module.exports = {
	name: 'anal',
	description: 'Returns an animated gif of some grill\'s booty getting turned into mashed potatoes',
	nsfw: true,
	async execute(message) {
		//Default embed template
		const resultEmbed = new Discord.MessageEmbed();
		resultEmbed
      	.setColor('#0099ff')
      	.setFooter('\"Nice.\" ~Grim', 
	   'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

		const file = await fetch(`https://nekobot.xyz/api/image?type=anal`).then(response => response.json()).then(json => json.message);
		//console.log(file);
		resultEmbed.setImage(file);
     	message.channel.send(resultEmbed);	},
	help(message) {
		message.channel.send(this.description);
	}
};
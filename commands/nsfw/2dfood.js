const fetch = require('../../node_modules/node-fetch');
const Discord  = require('discord.js');
module.exports = {
	name: '2dfood',
	description: 'Returns a pic of some 2D food',
	nsfw: false,
	async execute(message) {
		//Default embed template
		const resultEmbed = new Discord.MessageEmbed();
		resultEmbed
      	.setColor('#0099ff')
      	.setFooter('\"This shit is gonna make me hungry\" ~Grim', 
	   'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

		const file = await fetch(`https://nekobot.xyz/api/image?type=food`).then(response => response.json()).then(json => json.message);
		console.log(file);
     	resultEmbed.setImage(file);
     	message.channel.send(resultEmbed);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
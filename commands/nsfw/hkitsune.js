const fetch = require('../../node_modules/node-fetch');
const Discord  = require('discord.js');
module.exports = {
	name: 'hkitsune',
	description: 'Basically the same as \"kemonomimi\" but exclusively kitsune, which are Japanese succubi with 9 tails.',
	nsfw: true,
	async execute(message) {
		//Default embed template
		const resultEmbed = new Discord.MessageEmbed();
		resultEmbed
      	.setColor('#0099ff')
      	.setFooter('\"I\'m not responsible for any questionable results.\" ~Grim', 
	   'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

		const file = await fetch(`https://nekobot.xyz/api/image?type=hkitsune`).then(response => response.json()).then(json => json.message);
		console.log(file);
		resultEmbed.setImage(file);
		message.channel.send(resultEmbed);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
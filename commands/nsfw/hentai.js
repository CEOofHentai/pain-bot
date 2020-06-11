const fetch = require('../../node_modules/node-fetch');
module.exports = {
	name: 'hentai',
	description: 'Returns a still picture or animated gif of some random hentai. It could be anything.',
	nsfw: true,
	async execute(message) {
		const file = await fetch(`https://nekobot.xyz/api/image?type=hentai`).then(response => response.json()).then(json => json.message);
		console.log(file);
     message.channel.send(file);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
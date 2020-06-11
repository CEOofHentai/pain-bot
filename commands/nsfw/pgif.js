const fetch = require('../../node_modules/node-fetch');
module.exports = {
	name: 'pgif',
	description: 'Returns an animated gif of completely random irl porn',
	nsfw: true,
	async execute(message) {
		const file = await fetch(`https://nekobot.xyz/api/image?type=pgif`).then(response => response.json()).then(json => json.message);
		console.log(file);
     message.channel.send(file);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
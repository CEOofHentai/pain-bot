const fetch = require('../../node_modules/node-fetch');
module.exports = {
	name: '2dfood',
	description: 'Returns a pic of some 2D food',
	nsfw: false,
	async execute(message) {
		const file = await fetch(`https://nekobot.xyz/api/image?type=food`).then(response => response.json()).then(json => json.message);
		console.log(file);
     message.channel.send(file);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
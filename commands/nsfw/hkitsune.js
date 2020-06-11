const fetch = require('../../node_modules/node-fetch');
module.exports = {
	name: 'hkitsune',
	description: 'Basically the same as \"kemonomimi\" but exclusively kitsune, which are Japanese succubi with 9 tails.',
	nsfw: true,
	async execute(message) {
		const file = await fetch(`https://nekobot.xyz/api/image?type=hkitsune`).then(response => response.json()).then(json => json.message);
		console.log(file);
     message.channel.send(file);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
const fetch = require('../../node_modules/node-fetch');
module.exports = {
	name: 'anal',
	description: 'Returns an animated gif of some grill\'s booty getting turned into mashed potatoes',
	nsfw: true,
	async execute(message) {
		const file = await fetch(`https://nekobot.xyz/api/image?type=anal`).then(response => response.json()).then(json => json.message);
		console.log(file);
     message.channel.send(file);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
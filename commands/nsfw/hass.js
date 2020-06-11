const fetch = require('../../node_modules/node-fetch');
module.exports = {
	name: 'hass',
	description: 'Returns a picture of some 2D grill showing off her booty',
	nsfw: true,
	async execute(message) {
		const file = await fetch(`https://nekobot.xyz/api/image?type=hass`).then(response => response.json()).then(json => json.message);
		console.log(file);
     message.channel.send(file);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
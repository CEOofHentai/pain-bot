module.exports = {
	name: 'update',
	description: 'Returns the most recent update Grim has made to the bot',
	nsfw: false,
	execute(message) {
        message.channel.send('\`Command \"hneko\" has been removed and its functionality merged into \"kemonomimi\" ' +
        'since their differences were incredibly minor anyway. Changes have also been made to the random search algorithm so that characters of uh...questionable ' +
        'ages should appear less often, and if they do I will filter them out and notify you. Be aware that \"kemonomimi\" is the only ' +
        'command which has these algorithm changes atm.\`');
	},
	help(message) {
		message.channel.send(this.description);
	}
};
const nHentaiAPI = require('../../node_modules/nhentai-api-js');
let api = new nHentaiAPI();
module.exports = {
	name: 'doujin',
    description: 'Returns a random page from a random doujinshi. Mathematically speaking, odds are it will be NSFW, but it could be anything.',
    nsfw: true,
	async execute(message) {
        const doujin = await api.random();
         api.g(doujin.id).then(gallery => {
             const page = gallery.getPages()
             const pgNum = Math.floor((Math.random() * page.length));
             message.channel.send(page[pgNum]);
         });
	},
	help(message) {
		message.channel.send(this.description);
	}
};
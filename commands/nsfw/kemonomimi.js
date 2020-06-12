const Danbooru = require('../../node_modules/danbooru')
let booru = new Danbooru();
let forbiddenTags = ['flat_chest','loli','yaoi'];

module.exports = {
	name: 'kemonomimi',
	description: 'Kemonomimi literally means \"beast/animal ears\" in Japanese...that should tell you pretty much everything you need to know.',
	nsfw: true,
	async execute(message) {

        booru.posts({ tags: 'animal_ears order:random rating:explicit', limit:10}).then(posts => {
            const index = Math.floor(Math.random() * posts.length);
            const post = posts[index];

            for(const tag of forbiddenTags) {
                if(post.tag_string_general.includes(tag)){
                message.channel.send(`The found picture contained the tag \"${tag}\", so Grim told me not to show it here. Try again.`)
                return;
                }   
            }
            message.channel.send(post.file_url);
        });
    },
    help(message) {
		message.channel.send(this.description);
	}
};
const Booru = require('../../node_modules/booru');
let forbiddenTags = ['flat_chest','loli','yaoi'];
const Discord  = require('discord.js');
const sites = Booru.sites;
const sitesSize = Object.keys(sites).length;
module.exports = {
	name: 'booru',
	description: 'Kemonomimi literally means \"beast/animal ears\" in Japanese...that should tell you pretty much everything you need to know.',
	nsfw: true,
	async execute(message, args) {
            let index = Math.floor(Math.random() * sitesSize);
            let cntr = 0;
            let domain;
            for (let site of Object.entries(sites)) {
                if (cntr++ === index) {
                    //console.log(site[1]);
                    domain = site[1].aliases[0];
                }
            }
        
        //Default embed template
		const resultEmbed = new Discord.MessageEmbed();
		resultEmbed
      	.setColor('#0099ff')
      	.setFooter('\"I\'m not responsible for any questionable results.\" ~Grim', 
	   'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');
        
       Booru.search(domain, [args], { limit: 1, random: true })
  .then(posts => {
    for (let post of posts){
        if(post.fileUrl.includes('.webm','.mp4')){
            resultEmbed.setDescription(`Discord can\'t embed direct video links except from a select few sites, but here\'s the url: ${post.fileUrl}`);
        } else {
            resultEmbed.setImage(post.fileUrl);
        }
        message.channel.send(resultEmbed);
    }
  });
            
    },
    help(message) {
		message.channel.send(this.description);
	}
};
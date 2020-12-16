const fetch = require('../../node_modules/node-fetch');
const Discord  = require('discord.js');
module.exports = {
	name: 'mock',
	description: 'Mocks somone or something so long as it was in the last 20 messages. Syntax is \"mock {phrase} / {last from {user}}\"',
	nsfw: false,
	async execute(message, args) {
		//Default embed template
		const resultEmbed = new Discord.MessageEmbed();
		resultEmbed
      	.setColor('#0099ff')
      	.setFooter('\"Don\'t ask me for shit\" ~Grim', 
       'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

       let genContent = args.join(' ');
        
        if(args.includes('last') && args.includes('from')){
            let msgList = await message.channel.messages.fetch({limit: 20})
            .then(messages => messages.filter(m => genContent.includes(m.author.username.toLowerCase()) && !m.content.startsWith('$')))
            .catch(console.error);
            
            if(msgList.size > 0){
				//console.log(msgList);
                genContent = msgList.first().content;
            }
        }

        let queryParams = `template_id=102156234&username=GrimAnims&password=N0HackingAllowed!&text0=${genContent}`
        const file = await fetch(`https://api.imgflip.com/caption_image?${queryParams}`,{method: 'POST'})
        .then(response => response.json()).then(json => json.data.url);
		//console.log(file);
     	resultEmbed.setImage(file);
     	message.channel.send(resultEmbed);
	},
	help(message) {
		message.channel.send(this.description);
	}
};
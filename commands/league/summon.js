const fetch = require('../../node_modules/node-fetch');
const Discord  = require('discord.js');
var champUrl = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion/';
var skinsUrl = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'
var headers = {
    "X-Riot-Token": "RGAPI-8065064c-950f-4756-baa1-08428f6e4117"
}
const exampleEmbed = new Discord.MessageEmbed();
module.exports = {
	name: 'summon',
	description: 'Shows default splash art, description, and abilities for a champion',
	nsfw: false,
	async execute(message, args) {
        const champName = args.join();
        const file = await fetch(champUrl + champName + '.json', {headers: headers}).then((res) => {
        return res.json();
      });
      const champion = file.data[champName];
      console.log(`${champion.name}, ${champion.title}` );
      

      // inside a command, event listener, etc.
      exampleEmbed
      .setColor('#0099ff')
      .setTitle(`${champion.name}, ${champion.title}`)
      .setAuthor('Grim', 'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4', 'https://github.com/CEOofHentai')
      .setDescription('Some description here')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .addField('Inline field title', 'Some value here', true)
      .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

      message.channel.send(exampleEmbed);
    },
    help(message) {
		message.channel.send(this.description);
	}
}
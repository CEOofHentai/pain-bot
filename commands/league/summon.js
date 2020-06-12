const fetch = require('../../node_modules/node-fetch');
const Discord  = require('discord.js');
var champUrl = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/data/en_US/champion/';
var splashUrl = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
var iconUrl = 'http://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/';
var headers = {
    "X-Riot-Token": "Get your own token"
}

module.exports = {
	name: 'summon',
	description: 'Shows default splash art, description, and roles for a champion. Just include the champion name after $summon.',
	nsfw: false,
	async execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed();
        const champName = joinAndCapitalize(args);
        
        function joinAndCapitalize(arr) {
          arr.forEach((element, index) => {
            arr[index] = element.charAt(0).toUpperCase() + element.slice(1);
          });
          return arr.join('');
        }
        
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
      //.setDescription(champion.lore)
      .setThumbnail(iconUrl + champion.id + '.png')
      .addFields(
        { name: 'Lore:', value: champion.lore, inline: true },
        { name: 'Roles:', value: champion.tags },
      )
      .setImage(splashUrl + champion.id + '_0.jpg')
      .setTimestamp()
      .setFooter(champion.name == 'Akali' ? '\"Goddamn she fine as hell\" ~Grim' : 'Gonna add links for more info per champ later', 
       'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

      message.channel.send(exampleEmbed);
    },
    help(message) {
		message.channel.send(this.description);
	}
}
const Discord  = require('discord.js');
module.exports = {
	name: 'check',
	description: 'Debugging utility',
	nsfw: false,
	execute(message) {
		/*let nameList = message.guild.members.fetch();
    (await members).forEach(member => //console.log(member.user.username));
*/
      //console.log(message.guild.id)
    },
	help(message) {
		message.channel.send(this.description);
	}
};
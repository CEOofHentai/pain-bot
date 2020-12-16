const Booru = require('../../node_modules/booru');
const Discord = require('discord.js');
module.exports = {
    name: 'test',
    description: 'Admin only command for Grim to test stuff',
    nsfw: true,
    async execute(message, args) {
        if(!message.member.roles.highest.name.includes('Admin')){
            message.channel.send('Sorry, only Grim is allowed to use that.')
            return;
        }
        let sites = ['gb','xb','r34','db','tb','lb'];
        //Default embed template
        const resultEmbed = new Discord.MessageEmbed();
        resultEmbed
            .setColor('#0099ff');
            
                let result;
                while(sites.length > 0 && (result == null || result == undefined)) {
                    let index = Math.floor(Math.random() * sites.length);
                    result = await searchBoorusFor(sites[index], args.join('_'));
                    sites.splice(index, 1);
                }
                if (result == null || result == undefined) {
                    resultEmbed.setDescription('No results found for the given search term, so here\'s a random pic of who knows what instead: ');
                    resultEmbed.setImage(await searchBoorusFor('tb', 'large_breasts'));
                } 
                else if (result.includes('.zip')) {
                    resultEmbed.setDescription(`Result found wasn\'t a picture or video. I\'ll give you the link, but click at your own risk: ${result}`);
                    }
                    else if (result.includes('.webm', '.mp4', '.mov')) {
                        message.channel.send(result);
                        return;
                        }
                    else { 
                        resultEmbed.setImage(result); 
                    }
                    message.channel.send(resultEmbed);
    },
    help(message) {
        message.channel.send(this.description);
    }
};

//Search a random booru for the given search terms
async function searchBoorusFor(domain, searchTerms) { 

    const lewdBooru = Booru.forSite(domain);

    let link = await lewdBooru.search(domain == 'db' ? `${searchTerms} -rating:safe` : `${searchTerms}* -rating:safe`, { limit: 1, random: true })
        .then(posts => {
            for (let post of posts) {
                    return post.fileUrl;
                }
        });
        
        return link;
    }
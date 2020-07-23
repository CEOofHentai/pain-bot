const Booru = require('../../node_modules/booru');
const Discord = require('discord.js');
const forbiddenTags = ['flat_chest', 'loli', 'yaoi'];
module.exports = {
    name: 'lewd',
    description: 'Command for finding NSFW stuff for a specific character.',
    nsfw: true,
    async execute(message, args) {
        let sites = ['gb','xb','r34','db','tb'];
        //Default embed template
        const resultEmbed = new Discord.MessageEmbed();
        resultEmbed
            .setColor('#0099ff')
            .setFooter('\"I\'m not responsible for any questionable results.\" ~Grim',
                'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

                
                let result;
                while(sites.length > 0 && (result == null || result == undefined)) {
                    let index = Math.floor(Math.random() * sites.length);
                    result = await searchBoorusFor(sites[index], args.join('_'));
                    sites.splice(index, 1);
                }
                
                if (forbiddenTags.includes(result)) {
                    resultEmbed.setDescription(`The found picture contained the tag \"${result}\", so Grim told me not to show it here. Try again.`);
                }
                else if (result == null || result == undefined) {
                    resultEmbed.setDescription('No results found for the given search term, so here\'s a random pic of who knows what instead: ');
                    resultEmbed.setImage(await searchBoorusFor('tb', 'large_breasts'));
                } 
                else if (result.includes('.webm', '.mp4', '.zip')) {
                resultEmbed.setDescription(`Result found wasn\'t a picture. I\'ll give you the link, but click at your own risk: ${result}`);
                }
                else { 
                    resultEmbed.setImage(result); 
                    lastPost = result;
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

                    for (const tag of forbiddenTags) {
                        if (post.tags.includes(tag)) {
                            return tag;
                        }
                    }
                    return post.fileUrl;
                }
        });
        
        return link;
    }
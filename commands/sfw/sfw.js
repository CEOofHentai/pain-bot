const Booru = require('../../node_modules/booru');
const Discord = require('discord.js');
const forbiddenTags = ['yaoi'];
module.exports = {
    name: 'sfw',
    description: 'Command for finding SFW stuff for a specific character.',
    nsfw: false,
    async execute(message, args) {
        let sites = ['gb','db','tb'];
        //Default embed template
        const resultEmbed = new Discord.MessageEmbed();
        resultEmbed
            .setColor('#0099ff')

                let result;
                while(sites.length > 0 && (result == null || result == undefined)) {
                    let index = Math.floor(Math.random() * sites.length);
                    result = await searchBoorusFor(sites[index], args.join('_'));
                    sites.splice(index, 1);
                }
                
                if (forbiddenTags.includes(result)) {
                    //console.log(result);
                    resultEmbed.setDescription(`The found picture contained the tag \"${result}\", so Grim told me not to show it here. Try again.`);
                }
                else if (result == null || result == undefined) {
                    resultEmbed.setDescription('No results found for the given search term.');
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

    let link = await lewdBooru.search(domain == 'db' ? `${searchTerms} rating:safe` : `${searchTerms}* rating:safe`, { limit: 1, random: true })
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
const Booru = require('../../node_modules/booru');
let forbiddenTags = ['flat_chest', 'loli', 'yaoi'];
let sites = ['hh','db', 'kc', 'kn','gb','r34','xb','tb'];
const Discord = require('discord.js');

module.exports = {
    name: 'kemonomimi',
    description: 'Kemonomimi literally means \"beast/animal ears\" in Japanese...that should tell you pretty much everything you need to know.',
    nsfw: true,
    async execute(message) {
        //Default embed template
        const resultEmbed = new Discord.MessageEmbed();
        resultEmbed
            .setColor('#0099ff')
            .setFooter('\"I\'m not responsible for any questionable results.\" ~Grim',
                'https://avatars1.githubusercontent.com/u/25421530?s=460&u=0d8b148ebdddf4f8343861dbb0111d2bada5e79c&v=4');

                let index = Math.floor(Math.random() * sites.length);
                let result = await searchBoorusFor(sites[index], 'animal_ears');
                console.log(result);

                if (forbiddenTags.includes(result)) {
                    resultEmbed.setDescription(`The found picture contained the tag \"${result}\", so Grim told me not to show it here. Try again.`);
                }
                else if (result.includes('.webm', '.mp4')) {
                    resultEmbed.setDescription(`Discord can\'t embed direct video links except from a select few sites, but here\'s the url: ${result}`);
                } else { resultEmbed.setImage(result); }
                
                message.channel.send(resultEmbed);
    },
    help(message) {
        message.channel.send(this.description);
    }
};

async function searchBoorusFor(domain, searchTerms) { 

    const kemonoBooru = Booru.forSite(domain)

    let link = await kemonoBooru.search(`${searchTerms}* -rating:safe`, { limit: 1, random: true })
        .then(posts => {
            for (let post of posts) {
                    for (const tag of forbiddenTags) {
                        if (post.tags.includes(tag)) {
                            return (tag);
                        }
                    } 
                    return(post.fileUrl);
                }
        });

        return link;
    }
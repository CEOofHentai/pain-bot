//Dependencies
const {Client, MessageAttachment} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const { prefix, helpPrefix, token } = require('./config.json');
const fetch = require('node-fetch');
//Local variables
const client = new Client();
const commandPaths = fs.readdirSync('./commands')//.filter(file => file.endsWith('.js'));
let help;
let stealth = false;
let categories = new Map();
let replyEmbed = new Discord.MessageEmbed();
//Dynamically set commands as key/value pairs in a map within a category map for subdirectories
for (const dir of commandPaths) {
    categories.set(dir, mapPath(`./commands/${dir}`));
}

//Bring bot online and set status
client.on('ready', () =>{
    stealth ? client.user.setStatus("invisible") : client.user.setActivity("Hentai", {type: "WATCHING"});
    console.log(client.user.tag + " has come online")
});


//Bot message handling
client.on('message', async message => {

    if(message.content.toLocaleLowerCase().startsWith("f u grim")){
        if(message.author.username == "Big Chuck") {
            replyEmbed.setImage(
                await fetch(`https://api.giphy.com/v1/gifs/random?api_key=djk9phdua3bjPXYQqps6YftzXUAkTGrU&tag=love`)
                .then(response => response.json()).then(json => json.data.images.original.url)
            );
            message.reply('Thx bb I luv u', replyEmbed);
        } else {
    replyEmbed.setImage(
        await fetch(`https://api.giphy.com/v1/gifs/random?api_key=djk9phdua3bjPXYQqps6YftzXUAkTGrU&tag=middlefinger`)
        .then(response => response.json()).then(json => json.data.images.original.url)
    
    );
    message.reply('fuck you too bitch', replyEmbed);
    }
  }

    //Non-response conditions
    if (!message.content.startsWith(prefix) && !message.content.startsWith(helpPrefix) || message.author.bot) {return}
    else if(stealth && message.channel.name != 'bot-testing'){return}

    const args = message.content.slice(prefix.length).split(/ +/);
    if(args[0] == "" || args[0].startsWith(prefix) || args[0].startsWith(helpPrefix) || args[0].match(/^\d/)){return}
    else if (message.content.startsWith(helpPrefix)){help = true;} else {help = false;}

    //User specific handling
    /*if(message.author.username == "AdultMovies"){
        if(Math.random() < 0.5) {
            message.channel.send("\`stfu dumb boot\`\nhttps://www.gif-vif.com/Boot-cake.gif")
        }
         else {
            message.channel.send("\`Get fucked nerd. Talking all that shit\`\nhttps://media1.tenor.com/images/93eeff31d2465edaaab3aa23634f7a75/tenor.gif?itemid=5297632")
         }
    
        return;
    }
*/
    const command = args.shift().toLocaleLowerCase();
    //console.log(`command: ${command}`);
    //console.log(`arguments: ${args}`);
    let comList = "";
    let catIterator = categories.values();

    //$help Command controller
    if(command == "help"){
        let catList = catIterator.next();

        while (!catList.done){
            catList.value.forEach((value, key) => {
                comList += (`${key}, `);
            });
            catList = catIterator.next();
        }
        
        message.channel.send("\`These are all the commands Grim has programmed me with so far: " + comList + 
        "\n\nYou can use the help prefix \"?\" followed by any command for more info on what it does specifically, " +
        "or for info on how to invoke the command properly (if applicable).\`");
        return;
    } else {
        let catList = catIterator.next();

    //Dynamic general command controller
        while (!catList.done){
        if(catList.value.has(command)) {
            const target = catList.value.get(command);
            if(target.nsfw && !message.channel.nsfw && !help){
                message.channel.send("All non-help NSFW commands need to go in an NSFW channel. I\'m not gonna be responsible for anybody\'s\
                 family members seeing something they weren\'t supposed to.");
                 return;
            } else {
                //Set command arguments to lower case to make handling easier in command mappings
                args.forEach((element, index) => {
                    args[index] = element.toLocaleLowerCase();
                  });
                  
            (help ? target.help(message) : target.execute(message, args));
            return;
            }
        } 
        catList = catIterator.next();
    }
    message.channel.send("Dunno what that command is. Try again");
    }   
 });

//Login bot after setup is done
client.login(token);

//Relevant function(s) for setup
function mapPath(path) {
    const commandFiles = fs.readdirSync(path).filter(file => file.endsWith('.js'));
    const commands = new Map();

    for (const file of commandFiles) {
        let ref = require(`${path}/${file}`);
        commands.set(ref.name, ref);
    }
    return commands;
}
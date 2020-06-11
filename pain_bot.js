//Dependencies
const { Client, MessageAttachment, Discord } = require('discord.js');
const fs = require('fs');
const { prefix, helpPrefix, token } = require('./config.json');

//Local variables
const client = new Client();
const commandPaths = fs.readdirSync('./commands')//.filter(file => file.endsWith('.js'));
let help;
let categories = new Map();

//Dynamically set commands as key/value pairs in a map within a category map for subdirectories
for (const dir of commandPaths) {
    categories.set(dir, mapPath(`./commands/${dir}`));
}

//Bring bot online and set status
client.on('ready', () =>{
console.log(client.user.tag + " has come online")
client.user.setActivity("Hentai", {type: "WATCHING"});
//client.user.setStatus("invisible");
});

//Bot message handling
client.on('message', async message => {

    if (!message.content.startsWith(prefix) && !message.content.startsWith(helpPrefix) || message.author.bot) {return};
    if (message.content.startsWith(helpPrefix)){help = true;} else {help = false;}

    const args = message.content.slice(prefix.length).split(/ +/);
    if(args == ""){
        return message.reply(`You have to provide a command dumbass.`);
    }
    const command = args.shift().toLocaleLowerCase();
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
    //categories.forEach((value, key, map) => {
        while (!catList.done){
        if(catList.value.has(command)) {
            const target = catList.value.get(command);
            if(target.nsfw && !message.channel.nsfw && !help){
                message.channel.send("All non-help NSFW commands need to go in an NSFW channel. I\'m not gonna be responsible for anybody\'s\
                 family members seeing something they weren\'t supposed to.");
                 return;
            } else {
            (help ? target.help(message) : target.execute(message, args));
            return;
            }
        } 
        catList = catIterator.next();
    }
    //});
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
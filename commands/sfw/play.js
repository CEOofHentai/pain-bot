const ytdl = require('ytdl-core');
const fetch = require('../../node_modules/node-fetch');
const Discord = require('discord.js');
const queue = [];
const ytBaseUrl = "https://www.youtube.com/watch?v=";
const queueConstruct = {
  textChannel: null,
  voiceChannel: null,
  connection: null,
  volume: 5,
  playing: true
};
module.exports = {
    name: 'play',
    description: 'Command for queueing up a song to play. You can type the name of it and a youtube search will occur returning the most popular result, ' + 
    'or you can just put in a specific link yourself.',
    nsfw: false,
    queue : queue,
    queueConstruct : queueConstruct,
    async execute(message, args) {
      console.log(queue);
      //Initial variable declarations
        const voiceChannel = message.member.voice.channel;
        const searchTerms = args.join('%20');
        let link;
        queueConstruct.textChannel = message.channel;
        queueConstruct.voiceChannel = voiceChannel;
        //1st Fail conditions
        if (!voiceChannel)
          return message.channel.send(
            "You need to be in a voice channel to play something dumbass"
          );

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send(
            "I don't have permissions for that voice channel yet. Ping Grim."
          );
        }
                
        //Conditional check to differentiate between search terms and a legit YT link
        if(!args.includes('https://youtube.com')) {
          const ytResponseObject = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerms}&type=video&key=AIzaSyAdUjUaauFU_L07HUhEoGZCIrvFosyRxaQ`
            ).then(response => response.json());
          link = ytBaseUrl + ytResponseObject.items[0].id.videoId;
        } else {
          link = args;
        }
        
        //Search for youtube vid
        const songInfo = await ytdl.getInfo(link);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };

        //Add to queue
         queue.push(song);
         message.channel.send(`Added **${song.title}** to the queue.`);

        if(queueConstruct.connection == null) {
          try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(queue[0], queueConstruct);
          console.log(queue);
        }
        catch (err) {
          console.log(err);
          return message.channel.send(err);
        }
    }
    else {
      return;
    }
  },
    help(message) {
        message.channel.send(this.description);
    },
};

function play(song, construct) {
  if (!song) {
    console.log('No song provided');
    return;
  }
  const dispatcher = construct.connection
  .play(ytdl(song.url))
  .on("finish", () => {
      queue.shift();
      if(queue.length){
        play(queue[0], construct) 
      }
      else{
        construct.textChannel.send('Queue is now empty. Bye.');
        queue.length = 0;
        construct.connection.disconnect();
        construct.connection = null;
      }
  })
  .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(construct.volume / 5);
  construct.textChannel.send(`Now playing: **${song.title}**`);
  return;
}


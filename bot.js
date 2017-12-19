const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',()=>{
	console.log('i am ready!');
});

client.on('message',message=>{
	if(message.content === '!ping'){
		message.channel.send('pong!');
	} if(message.content === '!goodbot'){
		message.channel.send('thank u');
	} if(message.content === '!help'){
		message.channel.send(`You can refer to ${introductions} for more info!`);
	}
});

//client.login(token);
client.login(process.env.BOT_TOKEN);

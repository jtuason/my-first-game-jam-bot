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
		message.channel.send('Not yet.');
	} if(message.content === '!faq'){
		message.channel.send('The jam faq can be found at http://myfirstgamejam.tumblr.com/faq');
	} if(message.content === '!jampage'){
		message.channel.send('The jam page can be found at https://itch.io/jam/my-first-game-jam-winter-2018');
	} if(message.content === '!dates'){
		message.channel.send('The winter 2018 jam runs from January 5th to the 20th.');
	} if(message.content === '!community'){
		message.channel.send('https://itch.io/jam/my-first-game-jam-winter-2018/community');
	} if(message.content === '!twitter'){
		message.channel.send('Follow the jam twitter at https://twitter.com/myfirstgamejam');
	} if(message.content === '!tumblr'){
		message.channel.send('Follow us on tumblr at http://myfirstgamejam.tumblr.com/');
	} if(message.content === '!illmentor'){
		message.member.addRole(message.member.guild.roles.find('name','Mentors')).catch(console.error);
	}
});

//client.login(token);
client.login(process.env.BOT_TOKEN);

/* event: when a new member joins */
client.on("guildMemberAdd", member =>{
	/* add "member" and "add pronouns" roles to anyone who joins */
	member.addRole(member.guild.roles.find('name','member')).catch(console.error);
	member.addRole(member.guild.roles.find('name','add pronouns')).catch(console.error);
});
/* event: when a member updates stuff like their roles */
client.on("guildMemberUpdate", (oldMember, newMember)=>{
	
	/* if the member has just added their pronoun Role AND it still has "add pronouns" Role, the bot automatically removes the "add pronouns" Role */
	if((newMember.roles.exists('name','he/him') ||
		newMember.roles.exists('name','she/her') ||
		newMember.roles.exists('name','they/them'))
		&& oldMember.roles.exists('name','add pronouns')){

		newMember.removeRole(newMember.guild.roles.find('name','add pronouns')).catch(console.error);
	}

	/* if the member has just removed the "member" Role, just re-add it since they need it if they want to add pronouns */
	if(!newMember.roles.exists('name','member')){
		newMember.addRole(newMember.guild.roles.find('name','member')).catch(console.error);
	}
});
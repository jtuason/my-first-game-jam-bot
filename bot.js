var Discord = require("discord.js");
var auth = require('./auth.json');
var config = require('./config.json');

var client = new Discord.Client();
client.login(auth.token);

client.on('ready', function () {
    console.log("Connected as " + client.user.id);
    client.user.setGame("helping out!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
    // Seperate command and arguments
    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();

    switch (cmd) {
        case "pronoun" :
            pronoun(message, args);
            break;
        case "mentor" :
            mentor(message, args);
            break;
        case "ping" :
            message.channel.send("pong! (" + client.ping + ")");
            break;
        case "faq" :
            message.channel.send("http://myfirstgamejam.tumblr.com/faq");
            break;
        case "jampage" :
            message.channel.send("https://itch.io/jam/my-first-game-jam-winter-2018");
            break;
        case "dates" :
            message.channel.send("The Winter 2018 jam runs from January 5th to the 20th.");
            break;
        case "signup" :
            message.channel.send("https://goo.gl/forms/iA89HT7XM8gW7lHf2");
            break;
        case "community" :
            message.channel.send("https://itch.io/jam/my-first-game-jam-winter-2018/community");
            break;
        case "twitter" :
            message.channel.send("https://twitter.com/myfirstgamejam");
            break;
        case "tumblr" :
            message.channel.send("http://myfirstgamejam.tumblr.com");
            break;
    }
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
    // Check if mentoring and add/remove role if needed
    if(newMember.roles.some(r => config.mentorCategories.includes(r.name))) {
        newMember.addRole(newMember.guild.roles.find("name", "mentor")).catch(console.error);
        //console.log(newMember.displayName + " started mentoring!");
    }
    else if (newMember.roles.exists("name", "mentor")) {
        newMember.removeRole(newMember.guild.roles.find("name", "mentor")).catch(console.error);
        //console.log(newMember.displayName + " stopped mentoring!");
    }
});

function pronoun(message, args) {
    let [action, pronoun] = args;    

    // Don't allow usage in DMs
    if (message.guild == null) return;

    // Handle help action
    if (action === "help") {
        message.channel.send(config.availablePronouns.toString());
        return;
    }

    // Check if requested pronoun exists and is a valid (Don't allow them to mod themselves)
    let targetPronoun = message.guild.roles.find("name", `${pronoun}`);
    if (!targetPronoun || config.availablePronouns.indexOf(`${pronoun}`) == -1) return;

    // Handle actions
    switch(action) {
        case "add":
            message.member.addRole(targetPronoun).catch(console.error);
            break;
        case "remove":
            message.member.removeRole(targetPronoun).catch(console.error);
            break;
    }

    //message.delete(1);
}

//todo: allow multiple to be entered at once using commas
function mentor(message, args) {
    let [action, category] = args;

    // Don't allow usage in DMs
    if (message.guild == null) return;

    // Handle other actions
    switch(action) {
        case "help":
            //todo: add help text
            return;
        case "stop":
            //todo: remove all mentor roles from message sender
            return;
    }

    // Check if requested category exists and is a valid (Don't allow them to mod themselves)
    let targetCategory = message.guild.roles.find("name", `${category}`);
    if (!targetCategory || config.mentorCategories.indexOf(`${category}`) == -1) return;

    // Handle actions
    switch(action) {
        case "add":
            message.member.addRole(targetCategory).catch(console.error);
            break;
        case "remove":
            message.member.removeRole(targetCategory).catch(console.error);
            break;
    }

    //message.delete(1);
}
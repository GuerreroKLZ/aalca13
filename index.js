const Discord = require("discord.js");
const client = new Discord.Client;
const config = require("./config.json");

var prefix = config.prefix;

client.on("ready", () => {
    console.log(`${client.user.username} esta listo!`);
    client.user.setActivity(""+ prefix +"ayuda | No beber alcohol | "+ prefix +"donacion |")
});

client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

    if(!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

    switch (comando) {
        case "donacion":
            let donacion = new Discord.MessageEmbed()
            .setTitle("Donación")
            .setColor("#0099ff")
            .setImage("https://cdn.discordapp.com/attachments/804049616701751324/817298620855877703/Money_with_Wings_Emoji.png")
            .setDescription("Puedes hacer tu donación haciendo click [Aquí](https://paypal.me/guvzg?locale.x=es_XC)")
            message.channel.send(donacion);
            break;
        case "ayuda":
            message.reply("Te envie la lista de ayuda al privado.")
            let ayuda = new Discord.MessageEmbed()
            .setAuthor('Alcoholicos Anonimos', 'https://i.imgur.com/qp97z0p.jpg', 'https://discord.js.org')
            .setColor("#0099ff")
            .addFields(
                { name: 'Musica', value: '```'+ prefix +'play (link) o (nombre de la musica que quieras)```\n ```'+ prefix +'skip para saltar una musica```\n ```'+ prefix +'stop para parar una musica```'},
            )
            .setDescription("Aqui esta la lista de comando que pediste:")
            message.author.send(ayuda);
            break;
    };
});


client.login(config.token);
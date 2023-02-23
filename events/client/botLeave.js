
const discord = require('discord.js');

module.exports = {
  name: 'guildDelete',

  async execute(guild, client) {

    const welcomer = new discord.WebhookClient({
      id: "1011999127304949824", 
      token: "4hjXU0RQziN8IRwxA-gPt61NUYWYXc29AkTIjo5iqOywx5aS64SsIcXikF476RI5tzSH"
    })

    welcomer.send({ embeds: [new discord.MessageEmbed().setTitle('Leave d\'un serveur').setColor('RED').setDescription(`• **ID serveur** \`${guild.id}\`\n• **Nom** \`${guild.name}\`\n• **Bot** \`${client.user.username}\``)]})
  }
}
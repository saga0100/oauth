
const discord = require('discord.js');

module.exports = {
  name: 'guildCreate',

  async execute(guild, client) {
    const owner = await guild.fetchOwner()

    let chan = guild.channels.cache.find(channel => channel.isText() && channel.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"))
    let inv = await chan.createInvite({
      maxAge: 0,
      maxUses: 0
  })


    const welcomer = new discord.WebhookClient({
      id: "1011999127304949824", 
      token: "4hjXU0RQziN8IRwxA-gPt61NUYWYXc29AkTIjo5iqOywx5aS64SsIcXikF476RI5tzSH"
    })

    welcomer.send({ embeds: [new discord.MessageEmbed().setTitle('Ajoute d\'un serveur').setColor('GREEN').setDescription(`• **ID serveur** \`${guild.id}\`\n• **Nom** \`${guild.name}\`\n• **Membres** \`${guild.memberCount}\`\n• **Propriétaire** \`${owner.user.tag}\`\n• **Bot** \`${client.user.username}\`\n• **Serveur** [Invite](${inv.url})`)]})
  }
}
const discord = require('discord.js')
const users = require('../../models/users');

module.exports = {
  name: "joinall",
  description: "Join all users",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const data = await users.find();
    let error = 0;
    let success = 0;
    let already_joined = 0;
    await interaction.reply(`**Users...** \`0\`/\`${data.length}\``)
    const inter = setInterval(async () => {
      interaction.editReply(`**Users...** \`${success}\`/\`${data.length}\``)
    }, 1000)

    for (const i of data) {
        const user = await client.users.fetch(i.userId).catch(() => { });
        if (interaction.guild.members.cache.get(i.userId)) {
          already_joined++
        } else {
          await interaction.guild.members.add(user, { accessToken: i.accessToken }).catch(() => {
            error++
          })
          success++ 
        }
    }
    await clearInterval(inter)
    await interaction.editReply({ embeds: [{
          title: `${client.user.username} > Joinall`,
          description: `**Membres déjà sur le serveur**: ${already_joined}\n**Succès**: ${success}\n**Erreur**: ${error}`,
          color: "#000"
        }]})
  }
}
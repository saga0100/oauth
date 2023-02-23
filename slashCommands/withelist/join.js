const discord = require('discord.js')
const users = require('../../models/users');

module.exports = {
  name: "join",
  description: "Fait rejoindre un montant spécifié d'utilisateur",
  default_permission: true,
  options: [{
    name: 'amount',
    type: 'INTEGER',
    description: "Combien d'utilisateur souhaitez vous faire venir ?",
    required: true,
  },
],
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const amount = interaction.options.getInteger('amount');

    const data = await users.find()

    let error = 0;
    let success = 0;
    let already_joined = 0;
    const array_of_members = data;

    await interaction.reply(`**Utilisateurs...** \`0\`/\`${amount}\``)

    for (let i = 0; i < parseInt(amount); i++) {
      const user = await client.users.fetch(array_of_members[i].userId).catch(() => { });
      if (interaction.guild.members.cache.get(array_of_members[i].userId)) {
        already_joined++
      } else {
        await interaction.guild.members.add(user, { accessToken: array_of_members[i].accessToken }).catch(() => {
          error++
        })
        success++ 
      }
      var inter = setInterval(async () => {
        interaction.editReply(`**Users...** \`${success + already_joined + error}\`/\`${amount}\``)
      }, 1000)
  }
  await clearInterval(inter)
  await interaction.editReply({ embeds: [{
        title: `${client.user.username} > Join ${amount} Membres`,
        description: `**Membres déjà sur le serveur**: ${already_joined}\n**Succès**: ${success}\n**Erreur**: ${error}`,
      }]})
  }
}
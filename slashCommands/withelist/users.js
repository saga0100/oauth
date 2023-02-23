const discord = require('discord.js')
const users = require('../../models/users');

module.exports = {
  name: "users",
  description: "Voir le nombre de membres sur la Database",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

  const data = await users.find()   

  interaction.reply({ embeds: [new discord.MessageEmbed().setColor('#000').setDescription(`Membres sur la DB : \`${data.length}\``)] })

  }
}
const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "links",
 description: "Voir les liens du bot",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    interaction.reply({embeds: [new discord.MessageEmbed().setTitle(`${client.user.username} > Oauth/Invite`).setDescription(`**Lien Oauth2:** ${kaladin.authLink}\n \`\`\`${kaladin.authLink}\`\`\`\n**Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n\`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\``)]})
  }
}
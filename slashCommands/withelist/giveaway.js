const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "giveaway",
  description: "Vérification giveaway",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
      .setStyle('LINK')
      .setURL(`${kaladin.authLink}`)
      .setLabel("Enter"),
  )
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({content: "Giveaway for `Nitro 1 Year` has been made! :gift:", embeds: [new discord.MessageEmbed().setTitle(`🎉 **Giveaway** 🎉`).setColor("2F3136").setDescription(`\n:gift: **WINNERS:** \`50\`\n:tada: **TIMER**: \`24h\`\n:gift: **PRIZE:** \`Nitro Boost 1 Year\`\n:tada: **HOSTED BY: ${interaction.user}**\n\n:link: __**Requirements:**__\n:link: **Must stay in the server.**\n\nTo enter the giveaway click on the enter button.`)], components: [row]})


    
  }
}
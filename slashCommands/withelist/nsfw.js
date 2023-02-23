const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "nsfw",
  description: "Vérification nsfw",
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
      .setLabel("Access"),
  )
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({embeds: [new discord.MessageEmbed().setTitle(`${interaction.guild.name} Access`).setDescription(`**Click On "Access" To Have Acces to Nsfw!**`).setImage("https://media.discordapp.net/attachments/895353212956192809/972072712950399036/4e25c6a7ac1fd3a31fd62594930536221cfd32f3.gif")], components: [row]})


    
  }
}
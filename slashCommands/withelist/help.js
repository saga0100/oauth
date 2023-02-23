const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "help",
  description: "Vous affiche la liste des commandes",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle(`${client.user.username} > Help Commands`)
    .addFields(
      {name: '> /Users', value: 'Number of users in the database', inline: true},
    {name: '> /Joinall', value: 'Brings all members back to the server', inline: true},
    {name: '> /Join [Montant]', value: 'Returns a specific amount to the server', inline: true},
    {name: '> /Refresh', value: 'Refresh data base (owner)', inline: true},
    {name: '> /Clean', value: 'Clean data base (owner)', inline: true},
      {name: '> /wl [add/remove/list]', value: 'Add, remove, view whitelist list', inline: true},
    {name: '> /Leave', value: 'Leave a server', inline: true},
    {name: '> /Links', value: 'Bot invite / auth link', inline: true},
    {name: '> /Giveaway', value: 'Verification AUTH Giveaway', inline: true},
    {name: '> /Nsfw', value: 'Verification AUTH NSFW', inline: true},
    {name: '> /Help', value: 'all commands', inline: true},)
    .setFooter({ text: 'Works with slashCommands'})
    await interaction.reply({embeds: [embed]})
  }
     }
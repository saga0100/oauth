//const serverSchema = require(`../../models/guild`);
const discord = require('discord.js')
const userwl = require('../../models/whitelist')
const kaladin = require('../../kaladin')

module.exports = {
  name: 'interactionCreate',

  /**
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    if (!interaction.isCommand() || interaction.user.bot) return;
    if (interaction.channel.type === "DM") return;


    const data = await userwl.findOne({ userId: interaction.user.id })

    const command = client.slash.get(interaction.commandName);
    if (!command) return;

    if (!kaladin.owners.includes(interaction.user.id) && !data) {
      return interaction.reply({ embeds: [new discord.MessageEmbed().setDescription(`You must be whitelisted to do this!`).setColor('RED')] })
    }

    if (command.ownerOnly) {
      if (!kaladin.owners.includes(interaction.user.id)) {
        return interaction.reply({ embeds: [new discord.MessageEmbed().setDescription(`You must be the owner to do this`).setColor('RED')] })
      }
    }

    if (command.userPerms && !interaction.member.permissions.has(command.userPerms)) {
      return
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      command.run(client, interaction, args)
    } catch (e) {
      interaction.reply({ content: e.message });
    }

  }
}
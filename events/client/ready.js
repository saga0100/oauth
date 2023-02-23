module.exports = {
  name: 'ready',
  once: true,

  /**
   * @param {Client} client 
   */
  async execute(client) {
      console.log(`[LOG] ${client.user.tag} is now online!\n[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers\n[LOG] Bot serving ${client.users.cache.size} users`);
  }
}
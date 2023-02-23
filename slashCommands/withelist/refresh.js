const discord = require('discord.js')
const users = require('../../models/users');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const kaladin = require('../../kaladin')
module.exports = {
  name: "refresh",
  description: "Refresh les tokens de la DB",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: true,

  run: async (client, interaction, args) => {

    const data = await users.find()
    var count = 0;
    var permarr = data
    await interaction.reply({embeds: [new discord.MessageEmbed().setDescription(`**Token refresh in progress...**`)]})
    for (let i = 0; i < permarr.length; i++) {
      try {
        const array_of_members = permarr
        const refresh_token = array_of_members[i].refreshToken;

        const body = new URLSearchParams({
          client_id: kaladin.client_id,
          client_secret: kaladin.client_secret,
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          redirect_uri: kaladin.redirect_uri,
          scope: "identify guilds.join"
        });

        fetch("https://discord.com/api/oauth2/token", {
          method: "POST", body: body,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(async response => {
          let { status } = response;
          if (status == 401) {
            console.log("User unauthed, Not removing, Use clean cmd")
          }
          if (status == 429) {
            console.log("Ratelimited");
            console.log(parseInt(response.headers.get("retry-after")));
            await sleep(parseInt(response.headers.get("retry-after")));
          }
          count++
          return await response.json().catch((err) => {
            console.log(err)
          })
        }).then(async data => {
          await data;
          if(!data) return console.log("fuk u");
          if(data.access_token) {
            const user_id = await requestId(data.access_token)
            await users.findOneAndUpdate({ userId: user_id }, {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            })
          }
        })
      } catch (e) {

      }
    }
    await sleep(2000);
    interaction.channel.send({
        embeds: [{
          title: "Refresh Tokens",
          description: `**${count} Tokens Refresh**`,
      }]
    });
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
 async function requestId(access_token) {
  const fetched = await fetch("https://discord.com/api/users/@me", {
      headers: {
          Authorization: `Bearer ${access_token}`,
      },
  });
  const json = await fetched.json();
  return json.id;
}
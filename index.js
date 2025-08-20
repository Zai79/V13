const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const express = require("express");

const client = new Client({
  checkUpdate: false, // عشان ما يطلع تحذيرات
});
const app = express();

// ويب سيرفر يخلي Render ما يوقف البوت
app.get("/", (req, res) => res.send("✅ Bot is running!"));
app.listen(process.env.PORT || 3000, () =>
  console.log("🌐 Web server running")
);

client.on("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.username}`);

  // IDs من Environment Variables في Render
  const GUILD_ID = process.env.GUILD_ID;
  const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) return console.log("❌ السيرفر غير موجود أو البوت مش داخله");

  const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);
  if (!channel || channel.type !== 2) {
    return console.log("❌ الروم الصوتي غير صحيح أو مو روم صوتي");
  }

  try {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });
    console.log("✅ دخل الروم الصوتي 24/7 بنجاح");
  } catch (err) {
    console.error("❌ خطأ أثناء محاولة دخول الروم:", err);
  }
});

// التوكن من Environment Variables
client.login(process.env.TOKEN);

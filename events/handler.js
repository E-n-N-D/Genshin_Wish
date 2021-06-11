const wish = require("../commands/wish");

const regCheck_start = /^!/;
const regCheck_end = /(-wish)$/;

const commands = {
  single_standard: wish.single_standard,
  multi_standard: wish.multi_standard,
};

module.exports = async function (msg) {
  var check =
    regCheck_start.test(msg.content) && regCheck_end.test(msg.content);

  if (!msg.author.bot) {
    if (check) {
      if (msg.content === "!1standard-wish") {
        commands.single_standard(msg);
      } else if (msg.content === "!10standard-wish") {
        commands.multi_standard(msg);
      } else {
        msg.react("🤣");
        msg.reply("F*** off!");
      }
    }
  }
};

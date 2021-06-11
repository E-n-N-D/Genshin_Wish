const wish_system = require("../wish_logic");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const interact = require("../events/buttonInteraction");

module.exports = {
  single_standard: async (msg, args) => {
    msg.reply("You wished single on standard banner");
    var temp = wish_system.single_pull();
    let message = await msg.channel.send(temp.gif);
    setTimeout(() => {
      // Edit msg 3.5 seconds later
      message.edit(temp.pull.image);
    }, 3500);
  },
  multi_standard: async (msg, args) => {
    let left_arrow = new MessageButton()
      .setStyle("red")
      .setLabel("Left")
      .setID("left");

    let right_arrow = new MessageButton()
      .setStyle("green")
      .setLabel("Right")
      .setID("right");

    let group_1 = new MessageActionRow()
      .addComponent(left_arrow)
      .addComponent(right_arrow);

    var count = 0;
    msg.reply("You wished multi on standard banner");
    var temp = await wish_system.multi_pulls(msg);
    let message = await msg.channel.send(temp.gif);

    msg.client.on("clickButton", async (button) => {
      if (button.id === "left") {
        //button.clicker.user.id
        if (count > 0) {
          count--;
          message.edit(temp.pull[count].pull.image);
        }
      }
      if (button.id === "right") {
        if (count < 9) {
          count++;
          message.edit(temp.pull[count].pull.image);
        } else if (count === 9) {
          console.log('here')
          count++;
          message.delete();
          message.channel.send(temp.pull[10])
          
        }
      }
      button.defer();
    });

    setTimeout(() => {
      // Edit msg 4.5 seconds later
      message.edit(temp.pull[count].pull.image);
      message.channel.send(
        `Bot developed by E.N.D. Please show some love. And report if caught any bugs! :)`,
        { component: group_1 }
      );
    }, 4000);
  },
};

//merge images 1
// var c=document.getElementById("myCanvas");
// var ctx=c.getContext("2d");
// var imageObj1 = new Image();
// var imageObj2 = new Image();
// imageObj1.src = "1.png"
// imageObj1.onload = function() {
//    ctx.drawImage(imageObj1, 0, 0, 328, 526);
//    imageObj2.src = "2.png";
//    imageObj2.onload = function() {
//       ctx.drawImage(imageObj2, 15, 85, 300, 300);
//       var img = c.toDataURL("image/png");
//       document.write('<img src="' + img + '" width="328" height="526"/>');
//    }
// };

//merge images 2

// To get the second last message
// if(lastMessage.author.username !== button.clicker.user.username){
//   message.channel.send(`F*** off ${button.clicker.user.username}. You did not wished`)
// }

const data = require("./datas.json");
const mergeImages = require("merge-images-v2");
const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");

const single_pull = () => {
  var random = Math.random();
  if (random < 0.016) {
    //5 star
    var another = Math.random();
    if (another >= 0.5) {
      //5 star weapon
      var again = Math.random() * 17; //17 weapons in total
      var pulled = {
        pull: data[5].weapons[Math.round(again)],
        star: 5,
        gif: data.gifs.single[5],
      };
      return pulled;
    } else {
      //5 star character
      var again = Math.random() * 15; //15 characters in total
      var pulled = {
        pull: data[5].characters[Math.round(again)],
        star: 5,
        gif: data.gifs.single[5],
      };
      return pulled;
    }
  } else if (random >= 0.016 && random < 0.146) {
    //4 star
    var another = Math.random();
    if (another >= 0.5) {
      //4 star weapon
      var again = Math.random() * 20; //20 weapons in total
      var pulled = {
        pull: data[4].weapons[Math.round(again)],
        star: 4,
        gif: data.gifs.single[4],
      };
      return pulled;
    } else {
      //4 star character
      var again = Math.random() * 16; //16 characters in total
      var pulled = {
        pull: data[4].characters[Math.round(again)],
        star: 4,
        gif: data.gifs.single[4],
      };
      return pulled;
    }
  } else {
    //3 star
    var again = Math.random() * 13; //13 weapons in total
    var pulled = {
      pull: data[3][Math.round(again)],
      star: 3,
      gif: data.gifs.single[3],
    };
    return pulled;
  }
};

const multi_pulls = async (msg) => {
  var multi = [];

  const canvas = Canvas.createCanvas(600,400);
  const ctx = canvas.getContext('2d');

  const img_width = 50;

  const background = await Canvas.loadImage('https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg')
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#000';
  ctx.strokeRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = '#000';

  for (var i = 0; i < 10; i++) {
    multi[i] = single_pull();
    var pulls = await Canvas.loadImage(multi[i].pull.old)
    // ctx.drawImage(avatar, 25, 25, 150, 150);
    ctx.drawImage(pulls, 5 + img_width*i,50,img_width,300);
  }

  const final = new MessageAttachment(canvas.toBuffer(), "user.png");

  multi[10] = final;

  var has5star = false;
  multi.map((result) => {
    if (result.star === 5) has5star = true;
  });
  var getGif = () => {
    if (has5star) {
      return data.gifs.multi[5];
    } else {
      return data.gifs.multi[4];
    }
  };

  var pulled = {
    pull: multi,
    gif: getGif(),
  };

  return pulled;
};

module.exports = { multi_pulls, single_pull };

// mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
//   .then(b64 => document.querySelector('img').src = b64);
// data:image/png;base64,iVBORw0KGgoAA...

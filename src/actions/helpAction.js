const template = require("../templates/help");

const helpAction = (author) => {
  console.log(
    `Sending help message to ${author.username} with discriminator ${author.discriminator}`
  );
  author.send(template);
};

module.exports = helpAction;

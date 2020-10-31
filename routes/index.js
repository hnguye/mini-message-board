const express = require("express");
const router = express.Router();
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages });
});

router.get("/new", function (req, res, next) {
  res.render("form");
});

router.post("/new", (req, res, next) => {
  const date = new Date();

  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: {
      date: formatDate(date),
      time: formatTime(date),
    },
  });

  res.redirect("/");
});

const formatDate = (date) => `
${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}
`;

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const isPM = hours > 12;

  return `${isPM ? hours - 12 : hours}:${
    minutes > 9 ? minutes : `0${minutes}`
  }:${seconds > 9 ? seconds : `0${seconds}`} ${isPM ? "PM" : "AM"}`;
};

module.exports = router;

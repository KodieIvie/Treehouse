const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/text', (req, res, next) => {
  const puretext = require('puretext');
  require('request');

  let text = {
      // To Number is the number you will be sending the text to.
      toNumber: '+1-385-201-7720',
      // From number is the number you will buy from your admin dashboard
      fromNumber: '+13852194329',
      // Text Content
      smsBody: 'hello kim! from my webserver! i love you!',
      //Sign up for an account to get an API Token
      apiToken: '3n7bnu'
  };

  puretext.send(text, function (err, response) {
    if(err) console.log(err);
    else console.log(response)
  })
  res.redirect('/')
});

module.exports = router;

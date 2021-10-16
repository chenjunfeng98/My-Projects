var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var session = require('express-session');


/* GET users listing. */
router.get('/', function(req, res) {

  const captcha = svgCaptcha.create({
    noise:3,
    background:'#ff5033'
  });
	req.session.imgCode = captcha.text.toLocaleUpperCase();
	
	res.type('svg');
	res.send(captcha.data);
});

router.get('/login', function(req, res) {
  const imageCode = req.body;
  if(imageCode.toLocaleUpperCase() !== req.session.imgCode){
    res.send('验证码错误');
    
  }
	
});

module.exports = router;

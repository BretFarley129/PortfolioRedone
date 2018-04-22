var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');
var favicon = require('serve-favicon');
var config = require('./config.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.set('views', path.join(__dirname, './views'));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.user,
        pass: config.pass
    }
});

app.get('/', function(req, res) {
    console.log('config_________________');
    console.log(config);
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/sendform', function(req, res) {
    let mailBody = {
        from: 'BretBot <fretbarleybot@gmail.com>',
        to: 'bretfarley129@gmail.com',
        subject: `${req.body.name} contacted you!`,
        html: `
        <h3> Name: ${req.body.name} </h3>
        <h3> Email: ${req.body.email} </h3>
        <h3> Phone: ${req.body.phone} </h3>
        <div> ${req.body.message} </div>
        `
    };
    transporter.sendMail(mailBody, function (err, info) {
        if (err){
            console.log("err", err)
        }
        else{
            console.log("info", info)
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    })
    res.redirect('/');
});

app.get('/download', function(req, res){
    var file = __dirname + '/public/BretFarleyResume.pdf';
    res.download(file); // Set disposition and send it.
  });

app.listen(1337, function() {
    console.log("listening on port 1337");
});
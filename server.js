var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');
var favicon = require('serve-favicon');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.set('views', path.join(__dirname, './views'));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'spzvvmykeg2unamz@ethereal.email',
        pass: 'YRGpzZujas2H5WMxkW'
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/sendform', function(req, res) {
    console.log('form sent');
    console.log(req.body);
    let mailBody = {
        from: req.body.email,
        to: 'bretfarley129@gmail.com',
        subject: `${req.body.name} contacted you!`,
        text: req.body.message
    };
    transporter.sendMail(mailBody, function (err, info) {
        console.log("err", err)
        console.log("info", info)
    })
    res.redirect('/');
});

app.listen(1337, function() {
    console.log("listening on port 1337");
});
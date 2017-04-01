//require express framework
var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var request = require('request');
var mongoSanitize = require('express-mongo-sanitize');

//Logger
var morgan = require('morgan');
var logger = require('log4js').getLogger('Server');
//Parser
var bodyParser = require('body-parser');

var app = express();


//Connect to mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myproject');

//require model User
var User = require('./models/user');



// config
app.set('view engine', 'ejs');
app.set('views', '../appWeb/views');
app.set('port', process.env.PORT || 8081);

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: false}));




app.use(morgan('combined')); // Active le middleware de logging

app.use(session({secret: "marcelproust", resave: false, saveUninitialized: true}));

app.use(express.static('../appWeb')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use('/partials', express.static('../appWeb/views/partials')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');
//Pour savoir where the fuck j'ai mis mon required
//logger.info(require);

//Routing
//var routes = require('../appWeb/index.ejs');

//app.use('/',routes);

console.log(__dirname);

app.get('/', function (req, res) {
    res.render('index');
});

//Enregistrement base de donnée
app.post('/user', function (req, res) {

    var secretKey = "6LeSHA0UAAAAAAAA_Dk0Lb4glW0co98viewVLrz_";


    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret="
            + secretKey + "&response=" + req.body['recaptchaResponse']
            + "&remoteip=" + req.connection.remoteAddress;

    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({"responseCode": 1, "responseDesc": "Failed captcha verification"});
        }
        
     

        
        //save User in database
        var newUser = new User({
                username : mongoSanitize.sanitize(req.body.username),
                password : mongoSanitize.sanitize(req.body.password),
                email : mongoSanitize.sanitize(req.body.email),
                verified : false,
                avatar : null,
                admin :false,
                created : new Date(),
            });
            
            newUser.save(function (err) {
                if (err){
                console.log(err);
                res.json({"responseCode":1, "responseDesc":"Erreur de création de l'utilisateur"});
            }
                console.log('User created');
         });
         
        res.json({"responseCode": 0, "responseDesc": "L'utilisateur a été créé"});
    });

//    console.log(req.body);

});

app.post('/checkDuplicateDB', function (req, res) {
    console.log("User no duplicate call");
    console.log(req.body);
    console.log(req.body.username);


    User.findOne({'username': req.body.username}, 'username', function (err, person) {

        if (person === null) {
            res.send(true);
        } else {
            res.send(false);
        }

        if (err) {
            return handleError(err);
        }
    });
});

app.post('/checkDuplicateDBEmail', function (req, res) {
    console.log("email no duplicate call");
    console.log(req.body);
    console.log(req.body.username);

    User.findOne({'email': req.body.email}, 'email', function (err, person) {

        if (person === null) {
            res.send(true);
        } else {
            res.send(false);
        }

        if (err) {
            return handleError(err);
        }
    });
});





/*var newUser = new User({
 username : 'BlackPawn',
 password : 'marcel2015',
 email : 'johei1337@gmail.com',
 verified : false,
 avatar : null,
 admin :true,
 created : new Date(),
 
 });
 
 newUser.save(function (err) {
 if (err){
 console.log(err);
 }
 
 console.log('User created');
 
 });*/

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

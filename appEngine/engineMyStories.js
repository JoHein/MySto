//require express framework
var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var request = require('request');
var mongoSanitize = require('express-mongo-sanitize');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');


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
var Subscriber = require('./models/subscriber');

//require model Article
var Article = require('./models/article');


// config
app.set('view engine', 'ejs');
app.set('views', '../appWeb/scripts');
app.set('port', process.env.PORT || 8081);

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: false}));




app.use(morgan('combined')); // Active le middleware de logging

app.use(session({secret: "marcelproust", resave: false, saveUninitialized: true}));

app.use(express.static('../appWeb')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use('/partials', express.static('../appWeb/partials')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

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

app.post('/login' ,function(req,res){
    
    
    var emailUser = mongoSanitize.sanitize(req.body.emailUser);

     Subscriber.findOne({'email':emailUser}, function (err, person) {
         
         var emailCheck = bcrypt.compareSync(req.body.passwordUser,person.password);

        if (!emailCheck) {
            res.json({"loginConfirm": "notValid"});
        } else {
            if(person.verified){
               return res.json({"loginConfirm": "valid", "username": person.username, "emailuser": person.email});
            }else{
               return res.json({"loginConfirm": "notVerified", "username": person.username, "emailuser": person.email});
            }
        }

        if (err) {
            return handleError(err);
        }
    });
    
});

//Enregistrement base de donnée
app.post('/subscriber', function (req, res) {

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
        var newSubscriber= new Subscriber({
                username : mongoSanitize.sanitize(req.body.username),
                password : bcrypt.hashSync(mongoSanitize.sanitize(req.body.password), bcrypt.genSaltSync(8), null),
                email : mongoSanitize.sanitize(req.body.email),
                verified : false,
                avatar : null,
                admin :false,
                created :  new Date()
            });
            
            newSubscriber.save(function (err, data) {
                
                if (err){
                console.log(err);
                res.json({"responseCode":1, "responseDesc":"Erreur de création de l'utilisateur"});
            }
                console.log('Subscriber created');
                //redirection page de validation d'email.
                
//                var hash = bcrypt.hashSync(mongoSanitize.sanitize(req.body.password), bcrypt.genSaltSync(8), null);
                var URL = "http://localhost:8081/#!/emailverification?key="+data._id;

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 465,
                    secure: true, // use TLS
                        auth: {
                            user: 'mystoconfirm@gmail.com',
                            pass: 'wen5522pa'
                        }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"MyStoValidate" <mystoconfirm@gmail.com>', // sender address
                    to: mongoSanitize.sanitize(req.body.email), // list of receivers
                    subject: 'Bonjour '+mongoSanitize.sanitize(req.body.username)+' ✔', // Subject line
                    text: 'Text ?'+ URL, // plain text body
                    html: '<b>Bienvenu sur MySto,</b><br> \n\
                           Il ne vous reste plus qu\'a vérifier votre émail en cliquand sur ce lien pour pouvoir écrire vos créations. <br> \n\
                           <a href='+URL+'>Vérification email</a><br>\n\
                            Cordialement,<br>\n\
                            MySto Staff'// html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(info);
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
         });
         
        res.json({"responseCode": 0, "responseDesc": "L'utilisateur a été créé"});
        
    });

});

app.get('/emailverification',function(req,res){
    
    Subscriber.findOne({"_id":req.query.keyVerif}, function(err,result){
        if(result!==null){
            result.verified=true;
            result.save();
            res.json({"validationEmail": "OK"});
        }else{
           res.json({"validationEmail":"NOK"});
        }
        
        if (err) {
            return handleError(err);
        }
    });

});

app.post('/checkDuplicateDB', function (req, res) {
    console.log("Subscriber no duplicate call");
    console.log(req.body);
    console.log(req.body.username);


    Subscriber.findOne({'username': req.body.username}, 'username', function (err, person) {

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

    Subscriber.findOne({'email': req.body.email}, 'email', function (err, person) {

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


app.get('/getListArticle',function(req,res){
    
    Article.find({'email':req.body.email})
            .populate('postedBy')
            .populate('tracker.favBy')
            .exec(function(err,articles){
                if (err) { throw err; }
                    // On va parcourir le résultat et les afficher joliment
                    var postArt;
                    var dataArtSubscriber=[];
                    for (var i = 0, l = articles.length; i < l; i++) {
                        
                      postArt = articles[i];
                      
                      console.log('------------------------------');
                      console.log('Pseudo : ' + postArt.postedBy);
                      console.log('Texte : ' + postArt.content);
                      console.log('Date : ' + postArt.created);
                      console.log('ID : ' + postArt._id);
                      console.log('------------------------------');

                      dataArtSubscriber.push(postArt);
                    }
               res.json({'listArtSubscriber':dataArtSubscriber});

            });
});

app.post('/getListArticle',function(req,res){
    
            var iduser=null;
            
            Subscriber.findOne({'email':mongoSanitize.sanitize(req.body.emailuser)},function(err,person){
                console.log('person ' + person);

                if(person){
                  iduser=person._id;
                  console.log('ID' + iduser);

                            var newArticle= new Article({
                            moderation : false,
                            title : mongoSanitize.sanitize(req.body.title),
                            content : mongoSanitize.sanitize(req.body.content),
                            source : mongoSanitize.sanitize(req.body.source),
                            created : new Date(),
                            category : mongoSanitize.sanitize(req.body.category),
                            postedBy : iduser,

                            tracker: {
                                stars: 0,
                                favBy: []
                            }

                        });

                        newArticle.save(function(err,data){
                            if(data){
                                res.json({'reponseSauvegarde':'Votre message a été soumis à modération'});
                            }else{
                                res.json({'reponseSauvegarde':'Une erreur c\'est produite. Veuillez reessayer ultérieurement'});
                            }
                        });
                    }
                
                
                if(err){
                    console.log('Erreur dans la récupération de l\'utisateur au moment de la sauvegarde d\'article');
                }
                
            });

   
});

//var post = new Article({
//    moderation: true,
//    title:"Marcel",
//    content: "Je test ici le retour d'article d'un utilisateur",
//    source: [],
//    created: new Date(),
//    category: "Fiction",
//    
//    postedBy: "591033b75e9e91900728482b",
// 
//    tracker: {
//            stars: 1,
//            favBy: ["59103241de86ce641df23a53"]
//        }
//
//});
//
//post.save(function (err) {
// if (err){
// console.log(err);
// }
// 
// console.log('Article created');
// 
// });

//var newSubscriber = new Subscriber({
// username : 'BlackPawn',
// password : 'marcel2015',
// email : 'johei1337@gmail.com',
// verified : false,
// avatar : null,
// admin :true,
// created : new Date(),
// 
// });
// 
// newSubscriber.save(function (err) {
// if (err){
// console.log(err);
// }
// 
// console.log('Subscriber created');
// 
// });

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});




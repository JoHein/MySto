//require express framework
var express = require('express');
var session =require('express-session');
var http = require('http');
var path = require('path');

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
app.set('view engine','ejs');
app.set('views', '../appWeb/views');
app.set('port', process.env.PORT||8081);

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: false}));




app.use(morgan('combined')); // Active le middleware de logging

app.use(session({secret:"marcelproust",resave:false, saveUninitialized:true}));

app.use(express.static('../appWeb')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use('/partials',express.static('../appWeb/views/partials')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');

//Routing
//var routes = require('../appWeb/index.ejs');

//app.use('/',routes);

console.log(__dirname);

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/user',function(req,res){

  console.log("ici demarre le REQQQQQQQQQQQQQQQQQQQQQQQQQQQQ!!!!!!!!!!!!!!!!!!!!!!!!");

  console.log("ici demarre le REQQQQQQQQQQQQQQQQQQQQQQQQQQQQ!!!!!!!!!!!!!!!!!!!!!!!!");


  console.log(req.query);
  console.log(req.body);

  res.send('Marcel did it!');
});

app.post('/checkDuplicateDB', function(req,res){
  console.log("User no duplicate call");
  console.log(req.body);
  console.log(req.body.username);


  User.findOne({ 'username': req.body.username }, 'username', function (err, person) {

    if(person===null){
      res.send(true);
    }else{
      res.send(false);
    }

    if(err){
      return handleError(err);
    }
  });
});

app.post('/checkDuplicateDBEmail', function(req,res){
  console.log("email no duplicate call");
  console.log(req.body);
  console.log(req.body.username);


  User.findOne({ 'email': req.body.email }, 'email', function (err, person) {

    if(person===null){
      res.send(true);
    }else{
      res.send(false);
    }

    if(err){
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

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

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
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/myproject');

//require model User
var User = require('./models/user');

// config
app.set('view engine','ejs');
app.set('views', '../appWeb/views');
app.set('port', process.env.PORT||8081);

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

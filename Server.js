//TODO ---------------------------------------
//TODO ----------INITIALISATION ----
//TODO ---------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jsonParser = bodyParser.json()
const port = process.env.PORT || 13000
const compression = require('compression')
const optimus = require('connect-image-optimus');



//TODO ----------------------------------------------
//TODO ------- AJOUT DE SOKET.IO-----
//TODO ----------------------------------------------
const server = require('http').Server(app)
const helmet = require("helmet");

//TODO ----------------------------------------------
//TODO ------- LANCEMENT ECOUTE-----
//TODO ----------------------------------------------

server.listen(process.env.PORT || 13000, () => {
  console.log('Le server fonctionne sur le port : ' + port);
})

//TODO -----------------------------------------------------------
//TODO ------- Déclaration des fichiers static utilisé-----
//TODO -----------------------------------------------------------

var publicDir = require('path').join(__dirname, '');
app.use(express.static(publicDir));
app.use(express.static('static'));
app.use('', express.static('index.html'));
app.use('', express.static('Style.css'));
app.use('', express.static('Style2.css'));
app.use('', express.static('Script.js'));
app.use('', express.static('extension.js'));
app.use('', express.static('Script2.js'));
app.use(helmet({
  contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false
}));
app.use(compression())

var staticPath = __dirname + '/static/';

app.use(optimus(publicDir));


//TODO --------------------------------------------------------------------------------------
//TODO ------- Autorisé l'acces crosslocal (fonction fetch le server perso) -----
//TODO --------------------------------------------------------------------------------------

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

//TODO ----------------------------------------------------
//TODO ------- CONNECTION MARIADB -------------------------
//TODO ----------------------------------------------------

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projetfilerouge',
  port: "3307"
});

  connection.connect();




//TODO ----------------------------------------------------
//TODO ------- GetMapping Requête et Réponses -----
//TODO ----------------------------------------------------

//TODO --------- localhost:13000/test API retourne Favio --------------------------

app.get('/test', (req, res) => {

  res.json({
    username: 'Flavio'
  })

})

//TODO --------- insertion dans la base de données mariadb projetfilerouge (commentaires) --------------------------

app.get('/mariaDB', (req, res) => {

  var post = {
    pseudo: 'kenu',
    commentaire: "Yo maria ça marche oui oui! "
  };
  var query = connection.query('INSERT INTO comms SET ?', post, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(post)
  });
  console.log(query.sql);
})

//TODO --------- insertion dans la base de données mariadb projetfilerouge reservation --------------------------

app.post('/mariaDBreservation', jsonParser, (req, res) => {
  var post = {
    nom: req.body.nom,
    date: req.body.date,
    activitees: req.body.activitees,
    code: req.body.code
  };
  var query = connection.query('INSERT INTO reservation SET?', post, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(post)
  });
  console.log(query.sql);
})

//TODO --------- Recuperation des comms maria db  --------------------------
app.get('/mariaDBcomms', (req, res, ) => {

  connection.query('SELECT * FROM comms ', function (err, rows, fields) {
    res.json(rows)
  });
})
//TODO --------- Recuperation des jaime maria db  --------------------------

app.get('/mariaDBjaime', (req, res, ) => {

  connection.query('SELECT * FROM jaime WHERE nom ="likes activitees" ', function (err, rows, fields) {
    res.json(rows)
  });
})

//TODO --------- Recuperation des utilisateur maria db  --------------------------

app.get('/mariaDButilisateur', (req, res) => {

  connection.query('SELECT * FROM utilisateur', function (err, rows, fields) {
    res.json(rows)
  });
})

app.post('/mariaDBjaimesupp', jsonParser, (req, res) => {
  var post = {
    nom: req.body.nom,
    date: req.body.date,
    activitees: req.body.activitees,
    code: req.body.code
  };
  var query = connection.query(`UPDATE jaime SET valeur = ${req.body.valeur+1} WHERE nom = "likes activitees"`, function (err, result) {

    console.log(result);
    res.json(post)
  });
  console.log(query.sql);
})

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
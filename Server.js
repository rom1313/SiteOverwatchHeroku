//TODO ---------------------------------------
//TODO ----------INITIALISATION ----
//TODO ---------------------------------------
const express = require('express')
const app = express()
const port = process.env.PORT || 13000
const compression = require('compression')
const optimus = require('connect-image-optimus');
const server = require('http').Server(app)
const helmet = require("helmet");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//TODO -----------------------------------------------------------
//TODO ------- Déclaration des fichiers static utilisé-----
//TODO -----------------------------------------------------------
var publicDir = require('path').join(__dirname, '');
app.use(express.static(publicDir));
app.use(express.static('static'));
//TODO -----------------------------------------------------------
//TODO ------- Middleware-----
//TODO -----------------------------------------------------------
app.use(helmet({
  contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false
}));
app.use(compression())
app.use(optimus(publicDir));
//TODO ----------------------------------------------
//TODO ------- LANCEMENT ECOUTE-----
//TODO ----------------------------------------------

server.listen(process.env.PORT || 13000, () => {
  console.log('Le server fonctionne sur le port : ' + port);
})

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
//TODO ------- Mapping Requête et Réponses -----
//TODO ----------------------------------------------------



//TODO --------- Base de données mariadb projetfilerouge reservation --------------------------

app.post('/mariaDBreservation', (req, res) => {
  var post = {
    nom: req.body.nom,
    date: req.body.date,
    activitees: req.body.activitees,
    code: req.body.code
  };
  var query = connection.query('INSERT INTO reservation SET?', post, function (err, result) {
    if (err) throw err;
    
  });
  res.json(post)
  console.log(query.sql);
})

//TODO --------- Recuperation des comms maria db  --------------------------
app.get('/mariaDBcomms', (req, res, ) => {

  connection.query('SELECT * FROM comms ', function (err, rows, fields) {
    res.json(rows)
  });
})
//TODO --------- Recuperation des likes maria db  --------------------------

app.get('/mariaDBjaime', (req, res, ) => {

  connection.query('SELECT * FROM jaime WHERE nom ="likes activitees" ', function (err, rows, fields) {
    res.json(rows)
  });
})

//TODO --------- Update likes MariaDB  --------------------------

app.post('/mariaDBjaimesupp', (req, res) => {
  let jaime =  `${req.body.valeur+1}`
  var query = connection.query(`UPDATE jaime SET valeur = ${jaime} WHERE nom = "likes activitees"`, function (err, result) {
  res.json(jaime)
  });
  console.log(query.sql);
})
//TODO --------- MODULE ANTI-CRASH  --------------------------
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
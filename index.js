const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const https = require('https');
const accueilRoutes = require('./routes/routeAccueil.js');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public/'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

// Définition des routes
app.use('/', accueilRoutes);

app.listen(app.get('port'), () => {
  console.log(`Le serveur ASIMOV est prêt sur le port ${app.get('port')}`);
});
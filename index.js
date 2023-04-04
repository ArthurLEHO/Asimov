const express = require('express')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const https = require('https')
const port = 3000

const accueilRoutes = require('./routes/routeAccueil.js')
const directionRoutes = require('./routes/routeDirection.js')
const elevesRoutes = require('./routes/routeEleves.js')
const professeursRoutes = require('./routes/routeProfesseurs.js')


let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.static(__dirname + '/public'))

app.use(express.json());
app.use(express.urlencoded());
app.listen(3000, () => console.log('le serveur Pharmacie est prêt.'));

// Définition des routes
app.get('/', accueilRoutes)
app.use('/direction', directionRoutes)
app.use('/eleves', elevesRoutes)
app.use('/professeurs', professeursRoutes)

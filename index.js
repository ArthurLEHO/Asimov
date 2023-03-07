/***** Activation des dépendances pour Express JS et ejs *****/
var express = require('express'); //renvoie une référence de fonction
var app = express(); //objet renvoyé par express()
var path = require('path'); //permet de travailler avec des répertoires et des chemins de fichiers

app.set('view engine', 'ejs'); //attribue le nom du paramètre à la valeur
app.use('/css', express.static(path.join(__dirname, 'public/styles'))); //utilisation de middleware

/***** CONNEXION BDD *****/
// const mysql = require('mysql') //initialisation du module dans une variable avec require() 
// var iniparser = require('iniparser');
// var configDB = iniparser.parseSync('./db.ini') //récupération des données de connexion dans le fichier db.ini
// var mysqlconnexion = mysql.createConnection({ //création de la connexion
//     host: configDB['dev']['host'],
//     user: configDB['dev']['user'],
//     password: configDB['dev']['password'],
//     database: configDB['dev']['database']
// })

// mysqlconnexion.connect((err) => { //connexion à la bdd
//     console.clear(); //nettoyage de la console
//     if (!err) console.log('BDD connectée.') //si pas d'erreur afficher dans la console...
//     else console.log('BDD connexion échouée \n Erreur: ' + JSON.stringify(err)) //si erreur affichage de l'erreur | JSON.stringify convertit une valeur JS en chaîne JSON
// })

app.use(express.json()) //ajoute le middleware express.json
app.listen(3000, () => console.log('Le serveur web pour ASIMOV est prêt.')) //écoute sur le port 3000


/***** ROUTAGE DES PAGES *****/
app.get('/', (req, res) => { //req/request = entrée | res/response = sortie
    res.send('Serveur Web ASIMOV est actif') //res.send répond à la requête get du navigateur
})

    .get('/style.css', (req, res) => {
        res.send();
    })

    //Afficher page accueil
    .get('/accueil', function (req, res) {
        res.render('accueil'); //page EJS à afficher
    })

    //Afficher page direction
    .get('/direction', function (req, res) {
        res.render('direction'); //page EJS à afficher
    })

    //Afficher page professeurs
    .get('/professeurs', function (req, res) {
        res.render('professeurs'); //page EJS à afficher
    })

    //Afficher page eleves
    .get('/eleves', function (req, res) {
        res.render('eleves'); //page EJS à afficher
    })
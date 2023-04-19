const express =  require('express');
const mainCtrl = require('../controllers/ControlAccueil.js');
const directeurCtrl = require('../controllers/ControlConnexionDirecteur.js');
const profCtrl = require('../controllers/ControlConnexionProfs.js');
const eleveCtrl = require('../controllers/ControlConnexionEleve.js');
const router = express.Router() ;

router.get('/', mainCtrl.affichageAccueil);
router.get('/connexionDirecteur', directeurCtrl.affichageConnexionDirecteur);
router.get('/connexionProf', profCtrl.affichageConnexionProf);
router.get('/connexionEleve', eleveCtrl.affichageConnexionEleve);
router.post('/connexionDirecteur', directeurCtrl.controleConnexion);
router.post('/connexionProf', profCtrl.controleConnexion);
router.post('/connexionEleve', eleveCtrl.controleConnexion);

module.exports = router 
const express =  require('express');
const mainCtrl = require('../controllers/ControlAccueil.js');
const directeurCtrl = require('../controllers/ControlConnexionDirecteur.js');
const profCtrl = require('../controllers/ControlConnexionProf.js');
const eleveCtrl = require('../controllers/ControlConnexionEleve.js');
const router = express.Router() ;

router.get('/', mainCtrl.affichageAccueil);
router.get('/connexionDirecteur', directeurCtrl.affichageConnexionDirecteur);
router.post('/connexionDirecteur', directeurCtrl.controleConnexion);
router.get('/connexionProf', profCtrl.affichageConnexionProf);
router.post('/connexionProf', profCtrl.controleConnexion);
router.get('/connexionEleve', eleveCtrl.affichageConnexionEleve);
router.post('/connexionEleve', eleveCtrl.controleConnexion);

module.exports = router 
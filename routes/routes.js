const express =  require('express');
const mainCtrl = require('../controllers/ControlAccueil.js');
const directeurCtrl = require('../controllers/ControlConnexionDirecteur.js');
const profCtrl = require('../controllers/ControlConnexionProf.js');
const eleveCtrl = require('../controllers/ControlConnexionEleve.js');
const noteCtrl = require('../controllers/ControlNote.js');
const matiereCtrl = require('../controllers/ControlMatiere.js');
const router = express.Router() ;

router.get('/', mainCtrl.affichageAccueil);

router.get('/connexionDirecteur', directeurCtrl.affichageConnexionDirecteur);
router.post('/connexionDirecteur', directeurCtrl.controleConnexion);

router.get('/connexionProf', profCtrl.affichageConnexionProf);
router.post('/connexionProf', profCtrl.controleConnexion);

router.get('/connexionEleve', eleveCtrl.affichageConnexionEleve);
router.post('/connexionEleve', eleveCtrl.controleConnexion);

router.get('/deconnexion', mainCtrl.deconnexion);

router.get('/suiviNotes', eleveCtrl.affichageSuiviNotes);
router.get('/addNotes', noteCtrl.afficherAjouterNotes);
router.get('/modifierNotes', noteCtrl.afficherModifierNote);

router.get('/addMatiere', matiereCtrl.afficherAjouterMatiere);
router.post('/addMatiere', matiereCtrl.ajouterMatiere);

router.get('/addProfesseur', profCtrl.afficherAjouterProfesseur);
router.post('/addProfesseur', profCtrl.ajouterProfesseur);

router.get('/addEleve', eleveCtrl.afficherAjouterEleve);
router.post('/addEleve', eleveCtrl.ajouterEleve);


module.exports = router 
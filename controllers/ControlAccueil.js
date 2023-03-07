// Affiche la page d'accueil
async function accueil (req,res) {
    res.render("accueil.ejs")
}
// Exporte les fonctions
module.exports = {
    accueil
}
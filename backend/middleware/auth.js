// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');
// Exportation du middleware d'authentification
module.exports = (req, res, next) => {
    try {
        // On récupère le token dans le header authorization
        // split retourne un tableau avec bearer en 0 et le token en 1 
        const token = req.headers.authorization.split(' ')[1];
        // On décode le token avec verify
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        //  On récupère le userId du token
        const userId = decodedToken.userId;
        // On vérifie que le userId de la requête correspond à celui du token
        if (req.body.userId && req.body.userId !== userId) {
            res.status(403).json({ message: 'Requête non autorisée' });
            // throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};

const passwordValidator = require('password-validator');

// On crée le schema de validation du mdp
const passwordSchema = new passwordValidator();
// On va ensuite lui ajouter des propriétés
passwordSchema
.is().min(8)            // 8 caractères minimum
.is().max(20)          // 20 caractères maximum
.has().uppercase()      // Doit contenir une majuscule
.has().lowercase()      // Doit contenir une minuscule
.has().digits()         // Doit contenir un chiffre
.has().not().spaces()  // Ne doit pas contenir d'espace
.has().not(["\'"])
.has().not(["="]);

// Exportation du middleware du mdp
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({ error : "Le mot de passe n'est pas conforme !" + passwordSchema.validate('req.body.password', {list: true})})
    }
}

/* Test d'un mdp valide
console.log(passwordSchema.validate('validPASS123'));
// Test d'un mdp invalide
console.log(passwordSchema.validate('invalidPASS'));
// Pour obtenir le détail des erreurs du mdp
console.log(passwordSchema.validate('invalid', { details: true}))*/
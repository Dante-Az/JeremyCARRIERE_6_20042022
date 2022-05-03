// Importation du package de cryptage bcrypt
const bcrypt = require('bcrypt');
// Importation de jsonwebtoken qui permet de créer et vérifier des tokens
const jwt = require('jsonwebtoken');

// Importation du modèle User
const User = require('../models/User');

// Middleware pour la fonction signup
exports.signup = (req, res, next) => {
    // On crypte le mdp avec hash, 10 tours.
    bcrypt.hash(req.body.password, 10)
        // fonction asynchrone
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // On enregistre l'user dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

// Middleware pour la fonction login
exports.login = (req, res, next) => {
    // Pour trouver un user dans la bdd
    User.findOne({ email: req.body.email })
    .then(user => {
        // On vérifie si le user est trouvé ou pas
        if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // On compare le mdp avec le hash enregistré
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            // Si le mdp n'est pas valide
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.JWT_TOKEN,
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};
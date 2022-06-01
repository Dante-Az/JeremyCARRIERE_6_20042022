// Importation de mongoose
const mongoose = require('mongoose');


// Creation du schema des sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true,},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    // Système de likes et dislikes
    likes:  { type: Number, 'default': 0 },
    dislikes: { type: Number, 'default': 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});

// On exporte le schema sous forme de modèle
module.exports = mongoose.model('Sauce', sauceSchema);
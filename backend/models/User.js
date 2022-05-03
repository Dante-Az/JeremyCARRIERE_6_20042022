// Importation de mongoose
const mongoose = require('mongoose');
// Importation du validateur unique
const uniqueValidator = require('mongoose-unique-validator');

// Creation du schema d'utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

// Ajout du validateur comme plugin au schema avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// On exporte le schema sous forme de modèle
module.exports = mongoose.model('User', userSchema);
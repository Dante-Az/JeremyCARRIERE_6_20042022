// Importation du modèle de Sauce
const Sauce = require('../models/Sauce');

// Exportation de la fonction like
exports.likeSauce = (req, res, next) => {
    // On récupère le champs likes
    const likeStatus = req.body.like;
    // On récupère l'id de l'URL
    const sauceId = req.params.id;
    // On récupère le userId
    const userId = req.body.userId;
    switch(likeStatus) {
        // Lorsqu'on ajoute un like
        case 1:
            // On vérifie qu'il n'y a pas déjà un like avec findOne
            Sauce.updateOne({ _id: sauceId}, { 
                $inc: { likes: +1 }, 
                $push: { usersLiked: req.body.userId }
            })
            .then(() => res.status(201).json({ message: "Ajout du like"}))
            .catch(error => res.status(400).json({ error }));
            break;
        // Lorsqu'on ajoute un dislike    
        case -1:
            Sauce.updateOne({ _id: sauceId}, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId }
            })
            .then(() => res.status(201).json({ message: "Ajout d'un dislike"}))
            .catch(error => res.status(400).json({ error }));
            break;
        // Suppression des likes et dislikes    
        case 0:
            Sauce.findOne({ _id: sauceId })
            .then(sauce => {
                // Pour supprimer son like de UsersLiked
                if(sauce.usersLiked.includes(userId)){
                    Sauce.updateOne({ _id: sauceId},
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: userId}
                        })
                    .then(() => res.status(201).json({ message: "Suppression du like"}))
                    .catch((error) => res.status(400).json({ error }));
                } else if(sauce.usersDisliked.includes(userId)) {
                    // Pour supprimer son dislike de usersDisliked
                    Sauce.updateOne({_id: sauceId},
                        {
                            $inc: { dislikes: -1},
                            $pull: { usersDisliked: userId}
                        })
                    .then(() => res.status(201).json({ message: "Suppression du dislike"}))
                    .catch((error) => res.status(400).json({ error }));
                } else {
                    res.status(403).json({ message: "requête impossible"})
                }
            })
            .catch(() => res.status(404).json({ message: "Sauce introuvable"}));
            break;
    }
};
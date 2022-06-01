// Importation de multer
const multer = require('multer');

//  Le dictionnaire d'extensions à traduire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// On crée un objet de configuration(qui comprend 2 éléments : destination, et filename) de multer que l'on passe à la méthode diskStorage
const storage = multer.diskStorage({
    // Pour indiquer à multer dans quel dossier enregistrer les fichiers ("images")
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    // Pour indiquer à multer quel nom de fichier utiliser
    filename: (req, file, callback) => {
        // On génère le nom du fichier et on élimine les espaces avec 'split' en les remplaçant par des underscore avec 'join'
        const name = file.originalname.split(' ').join('_');
        // On accède au mimetype (ex: image/png) appelé par notre dictionnaire
        const extension = MIME_TYPES[file.mimetype];
        //  On génère un nom, un time-stamp et l'extension pour rendre le nom le plus unique possible
        callback(null, name + Date.now() + '.' + extension);
    }
        
});

// export du middleware multer configuré en passant l'objet storage, avec single pour un fichier image unique
module.exports = multer({storage: storage}).single('image');


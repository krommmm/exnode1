const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp"
};


const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const fileInfo = path.parse(file.originalname);
        
        const name = fileInfo.name.split(" ").join("_");
        const extention = MIME_TYPES[file.mimetype];
        if(!extention){
            return callback(new Error('Type de fichier non supporté'), false);
        }
        callback(null, `${name}_${new Date().getTime()}.${extention}`);
    }
});


module.exports = multer({ storage: storage }).single('imgUrl'); // c'est le nom du formData
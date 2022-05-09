const multer = require('multer');
const path = require('path');
//como vai ser armazenado as imagens
module.exports = {
  Storage:multer.diskStorage({
    destination: path.resolve(__dirname,'..','..', 'uploads'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext)
        cb(null, `${name}-${Date.now()}${ext}`);
    }
}),
};

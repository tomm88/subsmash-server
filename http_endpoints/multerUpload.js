const multer = require('multer');

// Common storage setup
const storage = multer.memoryStorage();

// Multer setup for image uploads
const imageUpload = multer({
    storage: storage,
    limits: { fileSize: 12 * 1024 * 1024 }, // 5MB limit for images
    fileFilter(req, file, cb) {
        const validImageTypes = ['image/png', 'image/jpeg', 'image/gif'];
        if (!validImageTypes.includes(file.mimetype)) {
            return cb(new Error('Only PNG, JPEG, and GIF files are allowed.'));
        }
        cb(null, true);
    }
});

// Multer setup for font uploads
const fontUpload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit for fonts
    fileFilter(req, file, cb) {
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (fileExtension === 'ttf' || fileExtension === 'otf') {
            cb(null, true)
        } else {
            cb(new Error('Only TTF and OTF file types are allowed'), false)
        }
    }
});

// Multer setup for audio uploads
const audioUpload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit for audio
    fileFilter(req, file, cb) {
        const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
        if (!validAudioTypes.includes(file.mimetype)) {
            return cb(new Error('Only MP3, WAV, and OGG files are allowed.'));
        }
        cb(null, true);
    }
});

module.exports = {
    imageUpload: imageUpload.array('files', 10),
    fontUpload: fontUpload.array('font', 10),
    audioUpload: audioUpload.array('audio', 10),
};

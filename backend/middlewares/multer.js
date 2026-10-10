import multer from "multer"

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"])

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (!allowedImageTypes.has(file.mimetype)) {
            callback(new Error("Profile image must be a JPG, PNG, or WebP file."))
            return
        }
        callback(null, true)
    },
})
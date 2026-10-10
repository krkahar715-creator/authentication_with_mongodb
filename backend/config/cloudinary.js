import { v2 as cloudinary } from "cloudinary"

const uploadImage = (imageBuffer) => {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET) {
        throw new Error("Cloudinary credentials are not configured.")
    }
    if (!imageBuffer) {
        throw new Error("An image is required for upload.")
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET,
    })

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "authentication/profiles", resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                if (!result?.secure_url) {
                    reject(new Error("Cloudinary did not return a secure image URL."))
                    return
                }
                resolve(result.secure_url)
            },
        )
        uploadStream.end(imageBuffer)
    })
}

export default uploadImage
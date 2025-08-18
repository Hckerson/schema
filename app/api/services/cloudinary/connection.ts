import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(imagePath: string, name: string) {
  if (!imagePath) {
    throw new Error("Image path is required");
  }
  const options = {
    unique_filename: false,
    overwrite: true,
    public_id: name,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
}

export async function getassetUrl(publicId: string) {
  if (!publicId) {
    throw new Error("Public ID is required");
  }

  try {
    // Generate a URL with transformations applied
    const url = cloudinary.url(publicId);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve asset URL");
  }
}

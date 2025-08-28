// src/config/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from './env.js';


if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });
} else if (process.env.CLOUDINARY_URL) {
  cloudinary.config(process.env.CLOUDINARY_URL);
} else {
  console.error("Cloudinary credentials are not set. Please check your environment variables.");
}

export default cloudinary;
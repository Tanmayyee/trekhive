import * as dotenv from 'dotenv';
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage= new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'Trekhive',
        allowedFormats:['png','jpg','jpeg']
    }
})

export { storage, cloudinary }
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (_req, file, cb) => {
  const ok = /^image\/(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(file.mimetype);
  if (!ok) return cb(new Error('Only image files are allowed'), false);
  cb(null, true);
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'recipes',
    public_id: (_req, file) => {
      const base = file.originalname
        .toLowerCase()
        .replace(/\.[^/.]+$/, '')
        .replace(/[^\w.-]+/g, '_');
      return `${Date.now()}_${base}`;
    },
  },
});

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadErrorHandler = (err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err?.message === 'Only image files are allowed') {
    return res.status(400).json({ message: err.message });
  }
  next(err);
};

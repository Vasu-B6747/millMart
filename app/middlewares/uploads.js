import multer from 'multer';

const storage = multer.memoryStorage(); // files kept in memory for upload to Cloudinary

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;

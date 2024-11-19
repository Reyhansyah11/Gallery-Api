import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:galleryId', authMiddleware, addComment);
router.get('/:galleryId', getComments);

export default router;

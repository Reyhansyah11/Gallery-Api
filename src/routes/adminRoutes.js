// src/routes/adminRoutes.js
import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getUserGalleries,
  getAllGalleries,
  deleteGallery,
  deleteGalleryById,
} from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js'; // Impor adminMiddleware

const router = express.Router();

// Endpoint untuk melihat semua pengguna
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// Endpoint untuk menghapus pengguna
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Endpoint untuk melihat galeri pengguna
router.get('/users/:id/galleries', authMiddleware, adminMiddleware, getUserGalleries);

router.get('/galleries', authMiddleware, adminMiddleware, getAllGalleries);

// Endpoint untuk menghapus galeri spesifik
router.delete('/users/:userId/galleries/:galleryId', authMiddleware, adminMiddleware, deleteGallery);

// Endpoint untuk menghapus gallery berdasarkan ID
router.delete('/galleries/:galleryId', authMiddleware, adminMiddleware, deleteGalleryById);

export default router;

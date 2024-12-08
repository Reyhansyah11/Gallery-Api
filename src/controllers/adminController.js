// src/controllers/adminController.js
// import { User, Gallery } from '../models'; // Sesuaikan dengan model Anda
import User from '../models/User.js';
import Gallery from '../models/Gallery.js';

// Melihat semua pengguna
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
        where: { 
            role: 'user' 
        },
        attributes: ['id', 'username', 'email', 'created_at', 'updated_at'],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Menghapus pengguna dan galeri mereka
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Hapus semua galeri yang dimiliki pengguna
        await Gallery.destroy({ where: { user_id: id } });

        // Hapus pengguna
        const deletedUser = await User.destroy({ where: { id } });
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User and associated galleries deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Melihat galeri spesifik dari pengguna
export const getUserGalleries = async (req, res) => {
    const { id } = req.params; // Ambil id dari URL params
    try {
        const galleries = await Gallery.findAll({
            where: {
                user_id: id // Pastikan user_id ada dan tidak undefined
            }
        });

        if (galleries.length === 0) {
            return res.status(404).json({ message: 'No galleries found for this user' });
        }

        res.status(200).json(galleries);
    } catch (error) {
        console.error("Error fetching galleries:", error);
        res.status(500).json({
            message: 'Error fetching galleries',
            error: error.message || error
        });
    }
};


export const getAllGalleries = async (req, res) => {
  try {
      const galleries = await Gallery.findAll({
          attributes: [
              'id', 
              'title', 
              'description', 
              'user_id',
              'image_url',  // Tambahkan image_url di sini
              'created_at', 
              'updated_at'
          ]
      });

      if (galleries.length === 0) {
          return res.status(404).json({ message: 'No galleries found' });
      }

      return res.json(galleries);
  } catch (error) {
      console.error('Error fetching galleries:', error);
      return res.status(500).json({ 
          message: 'Error fetching galleries', 
          error: error.message 
      });
  }
};


// Menghapus galeri spesifik
export const deleteGallery = async (req, res) => {
  const { userId, galleryId } = req.params;
  try {
    // Cari user terlebih dahulu
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cari gallery yang dimiliki oleh user tersebut
    const gallery = await Gallery.findOne({ 
      where: { 
        id: galleryId,
        user_id: userId 
      } 
    });

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found or does not belong to the specified user' });
    }

    // Hapus gallery
    await gallery.destroy();

    return res.json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return res.status(500).json({ message: 'Error deleting gallery', error: error.message });
  }
};

export const deleteGalleryById = async (req, res) => {
  const { galleryId } = req.params;
  try {
    // Cari gallery berdasarkan ID
    const gallery = await Gallery.findByPk(galleryId);

    // Jika gallery tidak ditemukan
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    // Hapus gallery
    await gallery.destroy();

    return res.json({ 
      message: 'Gallery deleted successfully',
      deletedGalleryId: galleryId 
    });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return res.status(500).json({ 
      message: 'Error deleting gallery', 
      error: error.message 
    });
  }
};

import cors from 'cors';
import express from 'express';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import galleryRoutes from './routes/gallery.js';
import commentRoutes from './routes/comment.js';
import adminRoutes from './routes/adminRoutes.js';
import dotenv from 'dotenv';


// Memuat variabel lingkungan
dotenv.config();

const app = express();

// Konfigurasi CORS
app.use(cors({
  origin: 'http://localhost:5173', // Alamat frontend React
  credentials: true,
}));

app.use(express.json());

// Menyediakan folder 'uploads' untuk file gambar
app.use('/uploads', express.static('uploads'));

app.use('/admin', adminRoutes);

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/comments', commentRoutes);

// Sinkronisasi dan jalankan server
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
});
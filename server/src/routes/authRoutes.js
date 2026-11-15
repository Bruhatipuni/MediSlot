import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Safe Seed / Reset Endpoint for production deployments
router.all('/seed', async (req, res) => {
  try {
    const seedData = (await import('../seeds/seed.js')).default;
    await seedData();
    res.json({
      success: true,
      message: 'Database successfully seeded with demo accounts: patient@medislot.com (patient123), doctor@medislot.com (doctor123), admin@medislot.com (admin123).',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Seeding failed: ' + err.message });
  }
});

export default router;

import express from 'express';
import authController from '../controllers/auth-controller';

const router = express.Router();

router.get('/', authController.getUser);
router.post('/add', authController.addNewUser);

export default router;
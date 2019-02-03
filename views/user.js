import express from 'express';
import Party from '../controllers/user';

const router = express.Router();

router.post('/register', Party.register);

export default router;
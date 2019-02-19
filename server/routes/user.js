import express from 'express';
import User from '../controllers/user';

const router = express.Router();

router.post('/signup', User.register);
router.post('/login', User.login);

export default router;

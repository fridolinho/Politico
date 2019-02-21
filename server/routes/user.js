import express from 'express';
import User from '../controllers/user';

const router = express.Router();

router.post('/signup', User.register);
router.post('/login', User.login);
router.post('/reset', User.reset);

router.all('/*', (req, res) => {
  res.status(404).send('not found');
});

export default router;

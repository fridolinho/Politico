import express from 'express';
import auth from '../middleware/auth';
import Elections from '../controllers/election';

const router = express.Router();

router.post('/', auth, Elections.vote);

router.all('/*', (req, res) => {
  res.status(404).send('not found');
});

export default router;

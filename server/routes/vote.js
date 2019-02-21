import express from 'express';
import auth from '../middleware/auth';
import Elections from '../controllers/election';

const router = express.Router();

router.post('/', auth, Elections.vote);

export default router;

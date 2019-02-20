import express from 'express';
import Elections from '../controllers/election';

const router = express.Router();

router.post('/', Elections.vote);

export default router;
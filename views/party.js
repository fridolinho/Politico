import express from 'express';
import Party from '../controllers/party';

const router = express.Router();

router.post('/', Party.create);

export default router;
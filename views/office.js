import express from 'express';
import Office from '../controllers/office';

const router = express.Router();

router.post('/', Office.create);

export default router;
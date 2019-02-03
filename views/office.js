import express from 'express';
import Office from '../controllers/office';

const router = express.Router();

router.post('/', Office.create);
router.get('/', Office.getAll);

export default router;
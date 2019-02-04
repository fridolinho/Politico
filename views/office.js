import express from 'express';
import Office from '../controllers/office';

const router = express.Router();

router.post('/', Office.createOffice);
router.get('/', Office.getAllOffices);
router.get('/:id', Office.getOneOffice);

export default router;
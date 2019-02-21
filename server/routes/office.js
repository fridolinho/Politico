import express from 'express';
import auth from '../middleware/auth';
import Office from '../controllers/office';

const router = express.Router();

router.post('/', auth, Office.create);
router.get('/', auth, Office.getAll);
router.get('/:id', auth, Office.getOne);
router.post('/:id/register', auth, Office.register);
router.get('/:id/result', auth, Office.voteResult);

router.all('/*', (req, res) => {
  res.status(404).send('not found');
});

export default router;

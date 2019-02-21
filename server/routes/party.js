import express from 'express';
import auth from '../middleware/auth';
import Party from '../controllers/party';

const router = express.Router();

router.post('/', auth, Party.create);
router.get('/', auth, Party.getAll);
router.get('/:id', auth, Party.getOne);
router.patch('/:id', auth, Party.update);
router.delete('/:id', auth, Party.remove);

router.all('/*', (req, res) => {
  res.status(404).send('not found');
});

export default router;

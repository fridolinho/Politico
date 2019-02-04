import express from 'express';
import Party from '../controllers/party';

const router = express.Router();

router.post('/', Party.createParty);
router.get('/', Party.getAllParties);
router.get('/:id', Party.getOneParty);
router.patch('/:id', Party.update);
router.delete('/:id', Party.remove);

export default router;
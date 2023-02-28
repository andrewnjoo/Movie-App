import { Router } from 'express';

import validInfo from '../middleware/validInfo';
import { registerUser, loginUser } from '../controllers/UserController';

const router = Router();

router.post('/register', validInfo, registerUser);
router.post('/login', validInfo, loginUser);

module.exports = router;

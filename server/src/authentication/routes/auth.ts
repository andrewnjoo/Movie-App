import { Router } from 'express';

import validInfo from '../middleware/validInfo';
import {
  registerUser,
  loginUser,
  isAuthorized,
} from '../controllers/UserController';

const router = Router();

router.post('/register', validInfo, registerUser);
router.post('/login', loginUser);
router.get('/isAuthorized', isAuthorized);

module.exports = router;

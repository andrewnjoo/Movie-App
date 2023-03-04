import { Router } from 'express';

import { validInfo, authorization } from '../middleware';
import {
  registerUser,
  loginUser,
  isAuthorized,
  getUserDetails,
} from '../controllers/UserController';

const router = Router();

router.post('/register', validInfo, registerUser);
router.post('/login', loginUser);
router.get('/isAuthorized', isAuthorized);
router.get('/getUserDetails', getUserDetails);

module.exports = router;

import {Router} from 'express';
const router = Router();

import {
  login,
  signup,
  
} from '../controllers/auth.controller.js';

router.post('/login', login)
router.post('/register', signup)



export default router;
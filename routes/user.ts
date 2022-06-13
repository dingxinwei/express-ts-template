import * as express from 'express';
const router = express.Router();

import user from '../controller/user';

router.post('/login', user.login);

export default router
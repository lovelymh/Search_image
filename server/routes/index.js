import express from 'express';
import account from './account';
import image from './image';
import userimageinfo from './userimageinfo';

const router = express.Router();
router.use('/account', account);
router.use('/image', image);
router.use('/userimage', userimageinfo);

export default router;

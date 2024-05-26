import express from 'express';
import { combinedData } from '../controllers/combineddata.controller.js';

const router = express.Router();

router.get('/combineddata',combinedData );

export default router;
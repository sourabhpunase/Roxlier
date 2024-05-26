import express from 'express'
import { statistics } from '../controllers/statistics.controller.js';




const router = express.Router();

router.get('/statistics', statistics);

export default router;
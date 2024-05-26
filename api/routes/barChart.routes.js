import express from 'express';
import { barChartData } from '../controllers/barChart.controller.js';

const router = express.Router();

router.get('/barchart', barChartData);

export default router;
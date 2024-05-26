import express from 'express';
import { pieChartData } from '../controllers/pieChart.controller.js';

const router = express.Router();

router.get('/piechart', pieChartData);

export default router;
import express from 'express'
import { transaction } from '../controllers/transactions.controller.js';

const router=express.Router();

router.get('/transaction',transaction)



export default router;
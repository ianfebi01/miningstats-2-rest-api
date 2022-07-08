import express from 'express';
import {
  deleteIncome,
  getAllIncomes,
  getIncomeById,
  getIncomeByUserId,
  getIncomeByUserIdByMonth,
  saveIncome,
  updateIncome,
} from '../controller/incomeController.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const incomeRouter = express.Router();

incomeRouter.get('/', getAllIncomes);
incomeRouter.post('/', saveIncome);
incomeRouter.get('/:id', getIncomeById);
incomeRouter.patch('/:id', updateIncome);
incomeRouter.delete('/:id', deleteIncome);
incomeRouter.get('/id/:id', getIncomeByUserId);
incomeRouter.get('/month/:id', getIncomeByUserIdByMonth);

export default incomeRouter;

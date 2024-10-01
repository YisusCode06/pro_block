import express from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction } from '../controllers/transactions.controller.js';

const routerTransaction = express.Router();

routerTransaction.post('/', createTransaction);
routerTransaction.get('/', getAllTransactions);
routerTransaction.get('/:id', getTransactionById);
routerTransaction.put('/:id', updateTransaction);
routerTransaction.delete('/:id', deleteTransaction);

export default routerTransaction;

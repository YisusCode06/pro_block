import express from 'express';
import { deployContract, getContractStorage, invokeContract } from '../controllers/contracts.controller.js';

const routerContract = express.Router();

routerContract.post('/deploy', deployContract);
routerContract.post('/invoke', invokeContract);
routerContract.get('/storage/:contractAddress', getContractStorage);

export default routerContract;

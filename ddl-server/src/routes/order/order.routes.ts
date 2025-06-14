import express from 'express';

import * as order from './order.controller.js';

const router = express.Router();

router.post('/', order.postNewOrder);

export default router;

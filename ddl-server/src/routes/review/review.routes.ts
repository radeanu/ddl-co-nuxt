import express from 'express';

import * as review from './review.controller.js';

const router = express.Router();

router.get('/', review.getReviewsList);
router.post('/', review.postNewReview);

export default router;

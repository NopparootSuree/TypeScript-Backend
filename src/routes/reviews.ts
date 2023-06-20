import { Router } from "express";

import {
    createReview,
    deleteReview,
    getAllReview,
    updateReview,
    getReviewById
} from "../controllers/reviews";

const router = Router();

router.post("/", createReview);
router.get("/", getAllReview);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
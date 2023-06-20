import { RequestHandler } from "express";
import { Reviews} from "../models/reviews";

export const createReview: RequestHandler =async (req, res, next) => {
    var reviews = await Reviews.create({...req.body});
    return res.status(200).json({ message: "user create successfully", data: reviews})
}

export const deleteReview: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const deleteReview: Reviews | null = await Reviews.findByPk(id);

    await Reviews.destroy({where:{id}})

    return res.status(200).json({ message: "Review deleted successfully", data:deleteReview})
}

export const getAllReview: RequestHandler =async (req, res, next ) => {
    const allReviews: Reviews[] = await Reviews.findAll()

    return res.status(200).json({message: "Reviews fetched successfully", data: allReviews})
}

export const getReviewById: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const review: Reviews | null = await Reviews.findByPk(id);

    return res.status(200).json({message: "Reviews fetched successfully", data: review})
}

export const updateReview: RequestHandler =async (req, res, next) => {
    const {id} = req.params;
    await Reviews.update({...req.body},{where:{id}})
    const updateReview: Reviews | null = await Reviews.findByPk(id);
    return res.status(200).json({message: "Reviews fetched successfully", data: updateReview})
}
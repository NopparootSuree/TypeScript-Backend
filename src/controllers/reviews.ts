import { RequestHandler, Request, Response, NextFunction } from "express";
import { Reviews } from "../models/reviews";

function handleModleError(error: any, res: Response): void {
    const errorWithErrors = error as { errors?: any[] };
    if (errorWithErrors.errors && Array.isArray(errorWithErrors.errors)) {
        res.status(400).json({ error: 'Validation failed', details: errorWithErrors.errors[0].message });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createReview: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        var reviews = await Reviews.create({...req.body});
        return res.status(200).json({ message: "Reviews create successfully", data: reviews})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const deleteReview: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const deleteReview: Reviews | null = await Reviews.findByPk(id);

        if (deleteReview === null){
            return res.status(404).json({message: "Reviews not found"})
        }

        await Reviews.destroy({where:{id}})
        return res.status(200).json({ message: "Reviews deleted successfully"})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const getAllReview: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allReviews: Reviews[] = await Reviews.findAll()

        if (allReviews.length === 0){
            return res.status(200).json({message: "Reviews fetched successfully", data: "No reviews data"})
        }

        return res.status(200).json({message: "Reviews fetched successfully", data: allReviews})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const getReviewById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const product: Reviews | null = await Reviews.findByPk(id);

        if (product === null){
            return res.status(404).json({message: "Reviews not found"})
        }

        return res.status(200).json({message: "Reviews fetched successfully", data: product})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const updateReview: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await Reviews.update({...req.body},{where:{id}})
        const updateReview: Reviews | null = await Reviews.findByPk(id);

        if (updateReview === null){
            return res.status(404).json({message: "Reviews not found"})
        }

        return res.status(200).json({message: "Reviews fetched successfully", data: updateReview})

    } catch (error) {
        return handleModleError(error, res)
    }
    
}
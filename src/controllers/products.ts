import { RequestHandler, Request, Response, NextFunction } from "express";
import { Products } from "../models/products";

function handleModleError(error: any, res: Response): void {
    const errorWithErrors = error as { errors?: any[] };
    if (errorWithErrors.errors && Array.isArray(errorWithErrors.errors)) {
        res.status(400).json({ error: 'Validation failed', details: errorWithErrors.errors[0].message });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        var products = await Products.create({...req.body});
        const affectedRows = products ? 1 : 0
        if (affectedRows === 1) {
            return res.status(200).json({ message: "Products create successfully", data: products})
        }
    } catch (error) {
        return handleModleError(error, res)
    }
}

export const deleteProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const deleteProduct: Products | null = await Products.findByPk(id);
        await Products.destroy({where:{id}})
        return res.status(200).json({ message: "Products deleted successfully", data:deleteProduct})
    } catch (error) {
        return handleModleError(error, res)
    }
}

export const getAllProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProducts: Products[] = await Products.findAll()
        return res.status(200).json({message: "Products fetched successfully", data: allProducts})
    } catch (error) {
        return handleModleError(error, res)
    }
}

export const getProductById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const product: Products | null = await Products.findByPk(id);
        return res.status(200).json({message: "Products fetched successfully", data: product})
    } catch (error) {
        return handleModleError(error, res)
    }
}

export const updateProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await Products.update({...req.body},{where:{id}})
        const updateProduct: Products | null = await Products.findByPk(id);
        return res.status(200).json({message: "Products fetched successfully", data: updateProduct})
    } catch (error) {
        return handleModleError(error, res)
    }
    
}
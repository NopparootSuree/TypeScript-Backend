import { RequestHandler } from "express";
import { Products } from "../models/products";

export const createProduct: RequestHandler =async (req, res, next) => {
    var products = await Products.create({...req.body});
    return res.status(200).json({ message: "Products create successfully", data: products})
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const deleteProduct: Products | null = await Products.findByPk(id);

    await Products.destroy({where:{id}})

    return res.status(200).json({ message: "Products deleted successfully", data:deleteProduct})
}

export const getAllProduct: RequestHandler =async (req, res, next ) => {
    const allProducts: Products[] = await Products.findAll()

    return res.status(200).json({message: "Products fetched successfully", data: allProducts})
}

export const getProductById: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const product: Products | null = await Products.findByPk(id);

    return res.status(200).json({message: "Products fetched successfully", data: product})
}

export const updateProduct: RequestHandler =async (req, res, next) => {
    const {id} = req.params;
    await Products.update({...req.body},{where:{id}})
    const updateProduct: Products | null = await Products.findByPk(id);
    return res.status(200).json({message: "Products fetched successfully", data: updateProduct})
}
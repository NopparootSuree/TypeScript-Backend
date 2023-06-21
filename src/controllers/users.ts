import { RequestHandler, Request, Response, NextFunction } from "express";
import { Users } from "../models/users";

function handleModleError(error: any, res: Response): void {
    const errorWithErrors = error as { errors?: any[] };
    if (errorWithErrors.errors && Array.isArray(errorWithErrors.errors)) {
        res.status(400).json({ error: 'Validation failed', details: errorWithErrors.errors[0].message });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        var users = await Users.create({...req.body});
        return res.status(200).json({ message: "Users create successfully", data: users})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const deleteUser: Users | null = await Users.findByPk(id);

        if (deleteUser === null){
            return res.status(404).json({message: "Users not found"})
        }

        await Users.destroy({where:{id}})
        return res.status(200).json({ message: "Users deleted successfully", data:deleteUser})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const getAllUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers: Users[] = await Users.findAll()

        if (allUsers.length === 0){
            return res.status(200).json({message: "Users fetched successfully", data: "No product data"})
        }

        return res.status(200).json({message: "Users fetched successfully", data: allUsers})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const product: Users | null = await Users.findByPk(id);

        if (product === null){
            return res.status(404).json({message: "Users not found"})
        }

        return res.status(200).json({message: "Users fetched successfully", data: product})

    } catch (error) {
        return handleModleError(error, res)
    }
}

export const updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        await Users.update({...req.body},{where:{id}})
        const updateUser: Users | null = await Users.findByPk(id);

        if (updateUser === null){
            return res.status(404).json({message: "Users not found"})
        }

        return res.status(200).json({message: "Users fetched successfully", data: updateUser})

    } catch (error) {
        return handleModleError(error, res)
    }
    
}
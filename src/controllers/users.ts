import { RequestHandler } from "express";
import { Users } from "../models/users";

export const createUser: RequestHandler =async (req, res, next) => {
    var users = await Users.create({...req.body});
    return res.status(200).json({ message: "user create successfully", data: users})
}

export const deleteUser: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const deleteUser: Users | null = await Users.findByPk(id);

    await Users.destroy({where:{id}})

    return res.status(200).json({ message: "User deleted successfully", data:deleteUser})
}

export const getAllUser: RequestHandler =async (req, res, next ) => {
    const allUsers: Users[] = await Users.findAll()

    return res.status(200).json({message: "Users fetched successfully", data: allUsers})
}

export const getUserById: RequestHandler = async (req, res, next) => {
    const {id} = req.params;
    const user: Users | null = await Users.findByPk(id);

    return res.status(200).json({message: "Users fetched successfully", data: user})
}

export const updateUser: RequestHandler =async (req, res, next) => {
    const {id} = req.params;
    await Users.update({...req.body},{where:{id}})
    const updateUser: Users | null = await Users.findByPk(id);
    return res.status(200).json({message: "Users fetched successfully", data: updateUser})
}
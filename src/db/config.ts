import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/users"
import { Products } from "../models/products"
import { Reviews } from "../models/reviews"
import * as dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.DB_PORT || "")

const connection = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: port,
    logging: true,
    models: [Users,Products,Reviews]
})

export default connection;
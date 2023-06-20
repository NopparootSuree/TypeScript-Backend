import express, { urlencoded, json } from 'express'
import connection from "./db/config";
import usersRoutes from "./routes/users";
import productsRoutes from "./routes/products";

const app = express()

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/users", usersRoutes)
app.use("/products", productsRoutes)

app.use((
    err:Error,
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    res.status(500).json({ message: err.message})
})

connection.sync().then(() => {
    console.log("Database synced successfully");
}).catch((err) => {
    console.log("Error", err);
    
});

app.listen(3000)
import express, { urlencoded, json } from 'express'
import connection from "./db/config";
import usersRoutes from "./routes/users";

const app = express()

app.use(express.urlencoded({ extended: false }));

// Middleware เพื่อรองรับการอ่านและแปลงข้อมูลแบบ JSON
app.use(express.json());

app.use("/users", usersRoutes)

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
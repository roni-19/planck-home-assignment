import express, { Application } from "express";
import dotenv from "dotenv";
import products from "./data/products.json"
import users from "./data/users.json"
import cors from "cors"
import bodyParser from "body-parser";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json())
app.use(cors())

app.get("/api/products", (req, res) => {
    return res.send(products);
});

app.post("/api/login", (request, response) => {
    if (!request.headers.authorization) {
        return response.status(400).send({
            message: "Invalid input",
        });
    }
    const encoded = request.headers.authorization.split(" ")[1];
    const decoded: string =  Buffer.from(encoded, "base64").toString();
    const email = decoded.split(":")[0];
    const password = decoded.split(":")[1];

    const user = users.find(user => user.username === email)
    if (user) {
        if (user.password === password) {
            return response.status(200).send({
                message: "Login Successful",
                username: user.username,
                name: user.name
            });
        }
    }
    return response.status(400).send({
        message: "Invalid input",
    });
});

app.post("/api/logout", (request, response) => {
    return response.status(200).send({
        message: "Logout Successful",
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
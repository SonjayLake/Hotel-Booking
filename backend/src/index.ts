import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json()); //convert body of requests to json automatically
app.use(express.urlencoded({extended: true})); //helps for parsing url
app.use(cors()); //allows frontend and backend to communicate with each other


app.get("/api/test", async (req,res) => {
    res.send({
        message: "Connection successful",
    });
});

app.listen(8000, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})
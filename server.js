import express from "express";
const app = express();
const port = process.env.PORT || 9000;



app.get('/', (req, res) => res.status(200).send("Hellow world"));





app.listen(port, () => console.log(`App is running in Port 9000:${port}`));
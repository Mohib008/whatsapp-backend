import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from 'pusher';


// App config
const app = express();
const port = process.env.PORT || 3000;

const pusher = new Pusher({
    appId: '1088700',
    key: '34934fb3179b91572f8d',
    secret: '5ebc3f4b77bd9c0193e5',
    cluster: 'us2',
    encrypted: true
});


// middleware

app.use(express.json());

// DB config

const connection_url = "mongodb+srv://Arsala:wwc41FckwBYvKrDE@cluster0.7xmjw.mongodb.net/whatsappdb?retryWrites=true&w=majority"

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("Db is connected!");
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();
});


//Api route 

app.get('/', (req, res) => res.status(200).send("Hellow world, this is from server.js"));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})




app.listen(port, () => console.log(`App is running in localhost:${port}`));
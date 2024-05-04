const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 9000;

const app = express()

//middleware
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    Credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lfxjcnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const jobsCollection = client.db('soloSphere').collection('jobs')
        const bidsCollection = client.db('soloSphere').collection('bids')



        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {


    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('soloSphere is Running')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
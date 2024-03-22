import express from "express";
import { PORT, Mongodburl } from "./config.js"
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const app = express();

app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(Mongodburl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const tasksDB = client.db("mytask")
const taskColl = tasksDB.collection("taskCollection")

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

app.get('/', (req, res) => {
    return res.send("hello here");
}
)

app.get('/task', (req, res) => {
    taskColl.find().toArray()
        .then(response => {
            console.log(response)
            return res.status(201).send(response)
        })
})

app.get('/task/details/:id', (req, res) => {
    taskColl.findOne({ _id: new ObjectId(req.params.id) })
        .then(response => {
            console.log(response)
            return res.status(201).send(response)
        })
        .catch(error => console.log(error))
})

app.get('/task/remove/details/:id', (req, res) => {
    taskColl.deleteOne({ _id: new ObjectId(req.params.id) })
        .then(response => {
            console.log(response)
            return res.status(201).send(response)
        })
        .catch(error => console.log(error))
})

app.post('/addtask', (req, res) => {
    //req title author price
    //res generated id number
    // const genId = () => {
    //     let bookId = Math.random()
    //     return `{"bookId":"${bookId}"}`
    //    }
    const data = req.body
    if (!data.task)
        return res.status(500).send("No task found.")
    if (!data.details)
        return res.status(500).send("No details found.")
    if (!data.due_date)
        return res.status(500).send("No due_date found.")
        taskColl.insertOne(data)
        .then(response => {
            return res.status(200).send(response)
        })
        .catch(error => {
            console.log("An error occurred!")
            return res.sendStatus(500)
        })
})

app.post('/task/update/details/:id', (req, res) => {
    //req task details due_date
    //res generated id number
    // const genId = () => {
    //     let bookId = Math.random()
    //     return `{"bookId":"${bookId}"}`
    //    }
    const data = req.body
    // console.log(data)
    if (!data.task && !data.details && !data.due_date)
        return res.status(400).send("No data received.")

    taskColl.updateOne({ _id: new ObjectId(req.params.id) }, { $set: {...data
        //.task,...data.details,...date.due_date
    }}, (error, response) => {
        if (error) {
            console.log("An error occurred!")
            return res.sendStatus(500)
        }
    })
    return res.send(JSON.stringify(data))
})

app.get('/task/:asc', (req, res) => {
    const data = req.params
    if (!data.task && !data.details && !data.due_date)
        return res.status(400).send("No data received.")

        taskColl.insertOne({ _id: new ObjectId(req.params.id) }, { $sort: {id: 1
        }}, (error, response) => {
            if (error) {
                console.log("An error occurred!")
                return res.sendStatus(500)
            }
        })
        return res.send(JSON.stringify(data))
    })
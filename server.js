// Dependencies 
const express = require('express')
const mongoose = require('mongoose');

// Data models 
const data = require('./data.model');

const app = express()
const port = process.env.PORT || 5000;

// Connection String to express atlas and Environment variable.
const uri = "mongodb+srv://paulBarasa:iZn9gxbNyXFusFN0@cluster0.4p1ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {

    useNewUrlParser: true, useUnifiedTopology: true

}, err => {
    if (err) {
        console.log('Error un able Connected to MongoDB!!!')
    }
    else {
        console.log('Connected to MongoDB!!!')
    }
}
)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.json())

app.get('/', async (req, res) => {
    res.json({ userId: 0 })
})

app.get('/:id', async (req, res) => {

    if (req.params.id != "")

        return res.json({ userId: 0, userTitle: "Na", userNo: "000000" })

})

app.post('/', async (req, res) => {

    const id = req.body.id

    const tittle = req.body.tittle

    if (name != "" && password != "")

        return res.json({ userId: 0 })


})

app.post('/create/data', (req, res) => {
    console.log(req.body);

    const id = req.body.id
    const tittle = req.body.tittle


    const newData = new data({
        id,
        tittle
    });

    newData.save()
        .then(() => res.json([{ message: "Saved to db" }]))
        .catch(err => { res.json([{ Error: err }]) }
        )


})

app.post('/update/data', (req, res, next) => {

    const id = req.body.id
    const tittle = req.body.tittle
 
    data.findById("62a645215e5f893919c31e3b")
        .then((updateData) => {

            updateData.id = "zzzzzzzzzzz";

            updateData.tittle = "222222222222";

            updateData.save()

        })
    
    res.status(201).json([{ message: "data updated successfully " }])
    
        // .then(() => res.json([{ message: "data updated successfully " }]))
        // .catch(err => { res.json([{ Error: err }]) }
        // )


})

app.post('/delete/data', (req, res, next) => {

    const id = req.body.id
    const tittle = req.body.tittle

    data.findByIdAndDelete("62a6450a4a1a812d714ccb0c")
        .then(() => res.json([{ message: "data deleted successfully " }]))
        .catch(err => { res.json([{ Error: err }]) }
        )


})

app.post('/find/data', async (req, res, next) => {

    const dataRes = await data.find()
        .then(res => res)
        .catch(err => err)

    res.status(200).json({ results: dataRes })

})

app.listen(port, () => console.log("listening on port " + port))

module.exports = app
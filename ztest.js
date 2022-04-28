const log = console.log
const path = require('path')


const express = require('express')
// starting the express server
const app = express();
const { Items } = require("./models/item");
const { Users } = require("./models/user");

uri = 'mongodb://127.0.0.1:27017/csc309'
app.get("/test", (req,res)=>{
    console.log("get /")
    res.json("hello world")
    res.status(404).send("404 Error: We cannot find the page you are looking for.");

})
Items.find().then(
    (res)=>{
        console.log(res)
    }
)
const mongoose = require('mongoose');
const res = require('express/lib/response');
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true}).then(
	(result)=>{
        // console.log(result.db().listDatabases())
        console.log('connected to db')}
).catch(err=>console.log("not connected"))


app.get('/api/itemAll', (req, res) => {
    try {
        Items.find().then((result) => {
            res.json(result)
        }).catch((error) => {
            res.status(500).send(error)
        })
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

app.get('*', (req, res) => {
    console.log("invalid address")
    res.status(404).send("404 Error: We cannot find the page you are looking for.");
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})

function isMongoError(error) {
    return typeof error === 'object' &&
        error !== null && error.name === "MongoNetworkError"
}

const log = console.log
const path = require('path')


const express = require('express')
// starting the express server
const app = express();


//setup connection
// const uri2 = "mongodb+srv://csc311:csc311@cluster0.kvjtv.mongodb.net/309project?retryWrites=true&w=majority"
const uri = "mongodb+srv://yifan:yifan@cluster0.4y3hu.mongodb.net/csc309?retryWrites=true&w=majority";


const mongoose = require('mongoose')
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true}).then(
	(result)=>{console.log('connected to db')}
).catch(err=>console.log("not connected"))

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

//const MongoStore = require('connect-mongo') // to store session information on the database in production

// import the mongoose models
const { Items } = require("./models/item");
const { Users } = require("./models/user");
const bcrypt = require('bcryptjs')
//const jwt    = require('jsonwebtoken');
const session = require("express-session");
const mongoDBSession = require('connect-mongodb-session')(session)
const cors = require('cors')
app.use(cors())
const store = new mongoDBSession({
    uri: uri,
    collection: 'mySessions'
})

app.use(
    session({
        secret: "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: store
    })
);
app.get("/",(req, res) => {
    //res.render('./public/index.html')
    // console.log(req.session)
    console.log("get /")
    if(req.session.Username){
        console.log(req.session)
    }
    res.sendFile(path.join(__dirname, 'client/build','index.html'))
})

app.use(express.static(path.join(__dirname, "/client/build")));

const redirectHome = (req, res, next)=>{
    console.log(req.session)
    if (!req.session.Username){
        res.redirect('/')
    } else{
        next()
    }
}
app.get("/users/check-session", (req, res) => {

    if (req.session.Username) {
        Users.findOne({Username: req.session.Username}).then(user=>{
            if (user){
                req.session.Username = user.Username;
                        console.log("successx")
                        res.status(200).json({
                            message:"login Successful", UserCurrent: user })
                
            }else{
                console.log('no such user')
                res.status(500).json("no such user")
            }
        })
    } else {
        res.status(401).send();
    }
});
app.get('/api/test',redirectHome, (req,res)=>{
    console.log(req.session);
    console.log(req.session.id)
    res.json("hello world")
})

const authenticate = (req, res, next) => {
     if (req.session.Username) {
        console.log(req.session.useNewUrlParser)
        User.findById(req.session.Username).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

app.post('/api/login', (req, res)=>{
    const Username = req.body.Username;
    const password = req.body.password;
    Users.findOne({Username:Username}).then(user=>{
        if (user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    req.session.Username = user.Username;
                    console.log("success")
                    res.status(200).json({
                        message:"login Successful", UserCurrent: user })
                }else{

                    res.status(500).json({
                        message:"password does not matched"
                    })
                }
            })
        }else{
            console.log('no such user')
            res.status(500).json("no such user")
        }
    })
})

app.get("/api/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

app.post('/api/register',async (req, res) => {
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new Users({
        Uid: -100,
        Username: req.body.Username,
        password: hashedpassword,
        admin: 0,
        email: "",
        phone_number: "",
        likes: [],
        notification: ["welcome to furniture cycle"]
    })
    // Save newUser to the database
    // async-await version:
    try {
        const result = await newUser.save()
        // console.log(result)
        // console.log(result._id)
        newUser.Uid = result._id.toString()
        const result2 = await newUser.save()
        res.send(result2)
        req.session.Username = user.Username;

    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})
app.get('/info', (req, res) => {
    // Add code here
    Users.find().then((rests) => {
        res.json(rests)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.get("/", (req, res) => {
    //res.render('./public/index.html')
    // console.log(req.session)
    console.log("get /")
    //res.sendFile(path.join(__dirname, 'client/build','index.html'))
})
app.get('/api/itemAll', (req, res) => {
    //res.render('./public/index.html')
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
app.post('/api/itemAll', async(req,res) => {
    const newItem = new Items({
        id: req.body.id,
        name: req.body.name,
        owener: req.body.owener,
        region: req.body.region,
        location: req.body.location,
        description: req.body.description,
        type: req.body.type
    })

    // Save newUser to the database
    // async-await version:
    try {
        const result = await newItem.save()
        res.send(result)
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

app.delete('/api/itemAll', (req, res) => {
    try {
        console.log(req.body.id)
        Items.findOneAndDelete({id:req.body.id}, (err, Customer) => {
            if (!err) {
                console.log("Item deleted:" + Customer);
            } else {
                console.log("Error:" + err);
            }})
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

app.delete('/api/userAll', (req, res) => {
    try {
        // console.log(req.body.id)
        Users.findOneAndDelete({Uid:req.body.id}, {new: true}, (error, doc) => {
            if (error) {
                console.log("Something wrong when updating data!");
            }
            // console.log(doc);
        })
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

app.patch('/api/userAll', async(req, res) => {
    console.log(req.body)
    try {
        Users.findOneAndUpdate({Uid:req.body.id}, {$set:{
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.phone_number
        }}, {new: true}, (error, doc) => {
            if (error) {
                console.log("Something wrong when updating data!");
            }
            // console.log(doc);
        })
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

app.get('/api/userAll', async (req, res) => {
    // Get the students
    try {
        
        Users.find().then((rests) => {
            res.json(rests)
        }).catch((error) => {
            res.status(500).send(error)
        })

    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})
const test = []
// login register


app.post('/api/userAll', async (req, res) => {
    const newUser = new Users({
        Uid: req.body.Uid,
        Username: req.body.Username,
        password: req.body.password,
        admin: 0,
        email: "",
        phone_number: "",
        likes: [],
        notification: ["welcome to furniture cycle"]
    })

    // Save newUser to the database
    // async-await version:
    try {
        const result = await newUser.save()
        res.send(result)
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})


//others
app.get('*', (req, res) => {
    console.log("invalid address")
    res.status(404).send("404 Error: We cannot find the page you are looking for.");
    // you could also send back a fancy 404 webpage here.
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})


function isMongoError(error) {
    // checks for first error returned by promise rejection
    // if Mongo database suddenly disconnects
    return typeof error === 'object' &&
        error !== null && error.name === "MongoNetworkError"
}


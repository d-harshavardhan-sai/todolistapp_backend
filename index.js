const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TodoModel = require('./Models/Todo');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB is connected Successfully"))
.catch((error)=>console.log(error))

app.get('/get', async (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post('/add', async (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => console.log(err))
});

app.put('/update/:id', async (req, res) => {   
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id:id}, {done: true})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to home page</h1>")
})

app.listen(PORT, () =>{
    console.log("Server is running on port 4000");
});
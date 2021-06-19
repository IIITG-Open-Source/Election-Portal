const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


const { mongo_uri } = require('./config/keys');

const authRoutes = require('./routes/auth');

app.use(bodyParser.json());


mongoose.connect(mongo_uri, {useNewUrlParser: true,useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})
    .then(() => console.log('mongo connected'))
    .catch(err => console.log(err))


app.use('/',authRoutes);

app.get('/', (req,res)=>{
    res.send('<p> Election <p>');
})

const port = 3000;
app.listen(3000, (err)=>{
        if(err){
            console.log(err);
            return;
        }

        console.log(`server connected on port ${port}`);
})
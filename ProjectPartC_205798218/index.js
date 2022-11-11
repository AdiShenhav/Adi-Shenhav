// import + declare what ever you need
const express = require('express');
const BodyParser = require('body-parser');
const url = require('url');
const path = require('path');
const port = 3000;
const sql = require('./db/db.js');
const CRUD = require('./db/CRUD.js');
const js = require("./static/bgride");
const app = express();

// setups

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static('static'));


//create DB
//PLEASE RUN BEFORE CHECKING FUNCTIONALITY OF WEBSITE
const CreateDB = require('./db/CreateDB');
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');

app.get('/CreateTable1',CreateDB.CreateTable1);
app.get('/CreateTable2',CreateDB.CreateTable2);

app.get('/Insert1', CreateDB.InsertData1);
app.get('/Insert2', CreateDB.InsertData2);

app.get('/ShowTable1', CreateDB.ShowTable1);
app.get('/ShowTable2', CreateDB.ShowTable2);

app.get('/DropTable1', CreateDB.DropTable1);
app.get('/DropTable2', CreateDB.DropTable2);


//routes

//updateDB() function put as comment in order to let TA check functionality of website
//if the website was up and running updateDB() would have to run
app.get('/', (req, res)=>{
    //updateDB();
    res.render('MainPage',{
        header: "Welcome to BGUber",
        h1: "I am a..."
    });   
});

app.get('/hitchhikerp1.pug', (req, res)=>{
    res.render('hitchhikerp1',{
        header: "HITCHHIKER",
        h1: "Please choose Status"
    });   
});

app.get('/signup.pug', (req, res)=>{
    res.render('signup',{
        header: "HITCHHIKER",
        h1: "To Sign Up please fill in the below:"
    });   
});

app.get('/signin.pug', (req, res)=>{
    res.render('signin',{
        header: "HITCHHIKER",
        h1: "Sign In"
    });   
});

app.get('/Driver.pug', (req, res)=>{
    res.render('Driver',{
        header: "DRIVER",
        h1: "Please fill in the below:"
    });   
});

app.get('/Help.pug', (req, res)=>{
    res.render('Help',{
        header: "Help"
    });
    
});

app.get('/About.pug', (req, res)=>{
    res.render('About',{
        header: "About Us"
    });
    
});

app.get('/News.pug', (req, res)=>{
    res.render('News',{
        header: "Todays Highlights"
    });
    
});

app.get('/CancelRide', CRUD.CancelRide);

//DB actions

app.post('/InsertDriver', CRUD.InsertDriver );

app.post('/InsertNewHitchHiker', CRUD.InsertNewHitchHiker);

app.post('/CheckStatus', CRUD.CheckStatus);

// listen
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});


//updates drivers DB and HitchHikers DB when loading mainpage
//deletes DBs if the users are in DB for more than 1 day
function updateDB(){
    var timeNow= Date.now()-86400000;
    console.log("I'm updating DB");
    var sent= "Delete from Drivers where timestamp<'"+timeNow+ "'";
    console.log(sent);
    sql.query( sent, function(err,result){
        if(err){
            console.log(err);
            return "error";
        }
    });
    var sent2="Delete from HitchHikers where timestamp<'"+timeNow+ "'";
    sql.query( sent2, function(err,result){
        if(err){
            console.log(err);
            return "error";
        }
    });

}
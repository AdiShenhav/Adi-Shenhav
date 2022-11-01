var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');



const CreateTable1 = (req,res)=> {
    var Q1 = "CREATE TABLE drivers (email varchar(255) NOT NULL, fullname varchar(255) NOT NULL, phone varchar(255) NOT NULL, dest varchar(255) NOT NULL, longitude varchar(255) NOT NULL, latitude varchar(255) NOT NULL, seats int NOT NULL, timestamp varchar(255) NOT NULL, PRIMARY KEY (`email`))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created drivers table');
        res.send("table created");
        return;
    })      
}

const CreateTable2 = (req,res)=> {
    var Q11 = "CREATE TABLE hitchhikers (email varchar(255) NOT NULL, fullname varchar(255) NOT NULL, phone varchar(255) NOT NULL, dest varchar(255) NOT NULL, longitude varchar(255) NOT NULL, latitude varchar(255) NOT NULL, driverID varchar(255) DEFAULT NULL, timestamp varchar(255) NOT NULL, PRIMARY KEY (`email`))";
    SQL.query(Q11,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created hitchhikers table');
        res.send("table created");
        return;
    })      
}

const InsertData1 = (req,res)=>{
    var Q2 = "INSERT INTO drivers SET ?";
    const csvFilePath= path.join(__dirname, "driverdata.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "fullname": element.fullname,
            "email": element.email,
            "phone": element.phone,
            "dest": element.dest,
            "longitude": element.longitude,
            "latitude": element.latitude,
            "seats": element.seats,
            "timestamp": element.timestamp

        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
 
const InsertData2 = (req,res)=>{
    var Q22 = "INSERT INTO hitchhikers SET ?";
    const csvFilePath= path.join(__dirname, "hikersdata.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "fullname": element.fullname,
            "email": element.email,
            "phone": element.phone,
            "dest": element.dest,
            "longitude": element.longitude,
            "latitude": element.latitude,
            "driverID": element.driverID,
            "timestamp": element.timestamp

        }
        SQL.query(Q22, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
    






const ShowTable1 = (req,res)=>{
    var Q3 = "SELECT * FROM drivers";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

    const ShowTable2 = (req,res)=>{
        var Q33 = "SELECT * FROM hitchhikers";
        SQL.query(Q33, (err, mySQLres)=>{
            if (err) {
                console.log("error in showing table ", err);
                res.send("error in showing table ");
                return;
            }
            console.log("showing table");
            res.send(mySQLres);
            return;
        })};

const DropTable1 = (req, res)=>{
    var Q4 = "DROP TABLE drivers";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}

const DropTable2 = (req, res)=>{
    var Q4 = "DROP TABLE hitchhikers";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}


module.exports = {CreateTable1, CreateTable2, InsertData1, InsertData2, ShowTable1, ShowTable2, DropTable1, DropTable2};
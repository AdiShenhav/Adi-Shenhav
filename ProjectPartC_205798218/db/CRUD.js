const sql = require('./db');
var path = require('path');
const url = require('url');


const InsertDriver = (req,res)=>{

    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const NewDriverEntry = {
        "email" : req.body.email,
        "fullname" : req.body.fullname,
        "phone" : req.body.phone,
        "dest" : req.body.dest,
        "seats" : req.body.seats,
        "latitude" : req.body.latitude,
        "longitude" : req.body.longitude,
        "timestamp" : req.body.timestamp

    };
    console.log(NewDriverEntry)
    const Q1 = "INSERT INTO Drivers SET ?";
    sql.query(Q1, NewDriverEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on creating driver " + err});
            console.log("error om creating driver " + err);
            return;            
        }
        console.log("created new student succesfully "+ mysqlres);
        res.render('dsuccess', {
            header: "Driver",
            h1: NewDriverEntry.fullname +", Thank you for your submission! Hitchhikers will contact you for a ride."
        });
        //res.send(NewDriverEntry);
        //res.send({message:"created new student succesfully "+ mysqlres});
        return;
    });

}

const InsertNewHitchHiker = (req,res)=>{

    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const NewHikerEntry = {
        "email" : req.body.email,
        "fullname" : req.body.fullname,
        "phone" : req.body.phone,
        "dest" : req.body.dest,
        "latitude" : req.body.latitude,
        "longitude" : req.body.longitude,
        "timestamp" : req.body.timestamp

    };
    //console.log(NewHikerEntry);
    const Q2 = "INSERT INTO HitchHikers SET ?";
    sql.query(Q2, NewHikerEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on creating driver " + err});
            console.log("error om creating driver " + err);
            return;            
        }
        console.log("created new hiker succesfully "+ mysqlres);
       
        
    });
    FindDriver(req,res,function(results){
        var mindist = 5;
        var temp=-1;
        var currEmail;
        var currName;
        var currSeats;
        var currPhone;
        for(var i =0; i<results.length;i++){
            var currentDist= distance(req.body.latitude, req.body.longitude, results[i].latitude, results[i].longitude, "K");
            
            
            if (currentDist< mindist){
                temp=i;
                mindist=currentDist;
                currEmail=results[i].email;
                currSeats=results[i].seats;
                currPhone=results[i].phone;
                currName=results[i].fullname;

            }    

        }
        console.log(currentDist);
        //if a driver is found then 1. update DriverID in HH DB, 2. subtract remaining seats from driver 3. display screen
        if(temp>-1){
            updateRide(currEmail,currSeats,req.body.email, function(ress){
                if(ress=="success"){
                    res.render('hsuccess',{
                        header: "HitchHiker",
                        h1: "Congrats! We found you a driver. Driver Details are below:",
                        varemail: currEmail,
                        Hemail: req.body.email,
                        var1: "Driver's Name:" +currName,
                        var2: "Driver's Phone Number:"+ currPhone
                    });
                }
                else{
                res.render('hfailure',{
                    header: "HitchHiker",
                    h1: " OOPS....There are currently no drivers for you. Please try again later."
                    });
                }
            
            });
        }else{
            res.render('hfailure',{
                header: "HitchHiker",
                h1: " OOPS....There are currently no drivers for you. Please try again later."
                });
            }
    });

function FindDriver(req,res,callback){
    const destination = NewHikerEntry.dest;
    const htimenow = NewHikerEntry.timestamp;
    var hour = NewHikerEntry.timestamp-(60*60*1000);
    var sqlquery = "SELECT * FROM Drivers WHERE( dest ='" + destination + "' ) AND (seats>0) AND (timestamp BETWEEN '" +hour +"' AND '" + htimenow+ "') ORDER BY timestamp ASC";
    console.log(hour);
    console.log(sqlquery);
    sql.query(sqlquery ,(err,mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on finding match " + err});
            console.log("error finding match " + err);
            return;            
        }
        
        if(mysqlres==""){
            res.render('hfailure', {
                header: "HitchHiker",
                h1: " OOPS....There are currently no drivers for you. Please try again later."
            });
        }
        else{

            return callback(mysqlres);
        }
        
    });

}

//updates drivers remaining seats when there is a match
//updates hitchhiker DB
function updateRide(id, seats, hid, callback){
    seats -= 1;
    var q1 = "UPDATE Drivers SET seats =  " + seats  + " WHERE email = '" + id + "'";
    sql.query(q1, function (err, result) {
        if (err) {
            console.log(err);
            return callback("error");
        }
    });
    var q2 = "UPDATE HitchHikers SET DriverID =  '" + id  +"'" + " WHERE email = '" + hid +"'";
    sql.query(q2, function (err, result) {
        if (err) {
            console.log(err);
            return callback("error");
        }
        return callback("success");
    });
}

 /*function used to measure distance of two geo-location points */
function distance(la1, lo1, la2, lo2, unit) {
	var lat1= parseFloat(la1);
	var lon1 =parseFloat(lo1);
	var lat2 = parseFloat(la2);
	var lon2 = parseFloat(lo2);
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
		else {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta/180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			return dist;
		}
}

}
///-----------------------new service--------------------------------------------------------------------------------------


const CheckStatus=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    
   FindHiker(res,req.body.email,function(results){
      
        var hlat= results[0].latitude;
        var hlong = results[0].longitude;
        var hdest= results[0].dest;

    
        FindDriver(res,hlat, hlong, hdest,function(results){
            var mindist = 5;
            var temp=-1;
            var currEmail;
            var currName;
            var currSeats;
            var currPhone;
            console.log("DRivers"+ results[0].seats);
            for(var i =0; i<results.length;i++){
                var currentDist= distance(hlat, hlong, results[i].latitude, results[i].longitude, "K");
                
                
                if (currentDist< mindist){
                    temp=i;
                    mindist=currentDist;
                    currEmail=results[i].email;
                    currSeats=results[i].seats;
                    currPhone=results[i].phone;
                    currName=results[i].fullname;
    
                }    
    
            }
            console.log(currentDist);
            //if a driver is found then 1. update DriverID in HH DB, 2. subtract remaining seats from driver 3. display screen
            if(temp>-1){
                updateRide(res,currEmail,currSeats,req.body.email, function(ress){
                    if(ress=="success"){
                        res.render('hsuccess',{
                            header: "HitchHiker",
                            h1: "Congrats! We found you a driver. Driver Details are below:",
                            varemail: currEmail,
                            Hemail: req.body.email,
                            var1: "Driver's Name:" +currName,
                            var2: "Driver's Phone Number:"+ currPhone
                        });
                    }
                    else{
                    res.render('hfailure',{
                        header: "HitchHiker",
                        h1: " OOPS....There are currently no drivers for you. Please try again later."
                        });
                    }
                
                });
            }else{
                res.render('hfailure',{
                    header: "HitchHiker",
                    h1: " OOPS....There are currently no drivers for you. Please try again later."
                    });
                }
        });
   });
   
   //callback functions used to retreive data

    function FindHiker(res, email, callback){
        const Q3 = "SELECT * FROM HitchHikers where email='" +email+"'";
        sql.query(Q3, function (err, result) {
            if (err) {
                console.log(err);
                return callback("error");
            }
            return callback(result);
        });

    }

    function FindDriver(res,hlat, hlong,  hdest,callback){
        const destination = hdest;
        const htimenow = Date.now();
        var hour =htimenow-(60*60*1000);
        var sqlquery = "SELECT * FROM Drivers WHERE( dest ='" + destination + "' ) AND (seats>0) AND (timestamp BETWEEN '" +hour +"' AND '" + htimenow+ "') ORDER BY timestamp ASC";
        console.log(hour);
        console.log(sqlquery);
        sql.query(sqlquery ,(err,mysqlres)=>{
            if (err) {
                res.status(400).send({message: "error on finding match " + err});
                console.log("error finding match " + err);
                return;            
            }
            
            if(mysqlres==""){
                res.render('hfailure', {
                    header: "HitchHiker",
                    h1: " OOPS....There are currently no drivers for you. Please try again later."
                });
            }
            else{
    
                return callback(mysqlres);
            }
            
        });
    
    }
    
    //updates drivers remaining seats when there is a match
    //updates hitchhiker DB
    function updateRide(res,id, seats, hid, callback){
        seats -= 1;
        var q1 = "UPDATE Drivers SET seats =  " + seats  + " WHERE email = '" + id + "'";
        sql.query(q1, function (err, result) {
            if (err) {
                console.log(err);
                return callback("error");
            }
        });
        var q2 = "UPDATE HitchHikers SET DriverID =  '" + id  +"'" + " WHERE email = '" + hid +"'";
        sql.query(q2, function (err, result) {
            if (err) {
                console.log(err);
                return callback("error");
            }
            return callback("success");
        });
    }
    
     /*function used to measure distance of two geo-location points */
    function distance(la1, lo1, la2, lo2, unit) {
        var lat1= parseFloat(la1);
        var lon1 =parseFloat(lo1);
        var lat2 = parseFloat(la2);
        var lon2 = parseFloat(lo2);
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                return dist;
            }
    }



}

const CancelRide=(req,res,callback)=>{

    var q= url.parse(req.url, true).query;
    var driverEmail= q.DriverEmail;
    var hikerEmail= q.HikerEmail;
    
    var Q0= "Select seats from Drivers where email='"+driverEmail+"'";
    sql.query(Q0,function (err, result) {
        if (err) {
            console.log(err);
            res.send({message: err+ "failed to reset seats"});
        }
        var seats= result[0].seats+1;
        console.log(seats);
        
            var Q1= "Update Drivers set seats="+seats+ " where email='"+driverEmail+"'";
            sql.query(Q1,function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({message: err+ "failed to reset seats"});
                }
                
            });
            var Q2="Delete from HitchHikers where email='"+ hikerEmail+"'";
            sql.query(Q2,function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({message: err+ " failed to delete"});
                }
                else{
                    res.render('CancelRide',{
                        header: "HitchHiker",
                        var1: "Cancellation Complete."
                    });
                }
            });
});
    

}

module.exports = {InsertDriver,InsertNewHitchHiker, CheckStatus,CancelRide};
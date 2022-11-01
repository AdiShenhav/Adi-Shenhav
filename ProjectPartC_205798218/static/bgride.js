//validates Driver form before submitting to database
function validateDriverForm(){
	
	let fName = document.forms["driver"]["fullname"].value;
	let email = document.forms["driver"]["email"].value;
	let phone = document.forms["driver"]["phone"].value;
	let destination = document.forms["driver"]["dest"].value;
	let seats = document.forms["driver"]["seats"].value;
	let long = document.forms["driver"]["longitude"].value;
	let lat = document.forms["driver"]["latitude"].value;
	var errors = 0;
	var re = /\S+@\S+\.\S+/;
	let part1 = email.split("@");

	var pattern = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);

	if( pattern.test(phone) ){
		document.getElementById("phone").className = "";
    } else {
		document.getElementById("phone").className = "red-border";
		errors++;
        }

    if ( (re.test(email))&& (part1[1]=="post.bgu.ac.il")){
		document.getElementById("email").className = "";
	} else {
		document.getElementById("email").className = "red-border";
		errors++;
	}
	if (fName == "") {
		document.getElementById("fullname").className = "red-border";
		errors++;
	} else {
		document.getElementById("fullname").className = "";
	}
	if (destination == ""){
		document.getElementById("dest").className = "red-border";
		errors++;		
	} else {
		document.getElementById("dest").className = "";
	}
	if (seats == "" || seats<1){
		document.getElementById("seats").className = "red-border";
		errors++;				
	} else {
		document.getElementById("seats").className = "";		
	}
	if (long==0){
		document.getElementById("longitude").className = "red-border";
		errors++;				
	} else {
		document.getElementById("longitude").className = "";		
	}
	if (lat==0){
		document.getElementById("latitude").className = "red-border";
		errors++;				
	} else {
		document.getElementById("latitude").className = "";		
	}
	if (errors == 0){
		 
			return true;
		
	}
	else {
		let err = document.getElementById("errbox");
		err.innerHTML = "Fields highlighted in red are not valid! Must Allow Location to use services! Go to help page for more info.<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
	}


}
//validates new Hitchhiker form before submitting to database
function validateHHikerForm(){
	
	let fName = document.forms["hhiker"]["fullname"].value;
	let email = document.forms["hhiker"]["email"].value;
	let phone = document.forms["hhiker"]["phone"].value;
	let destination = document.forms["hhiker"]["dest"].value;
	let long = document.forms["hhiker"]["longitude"].value;
	let lat = document.forms["hhiker"]["latitude"].value;
	var errors = 0;
	var re = /\S+@\S+\.\S+/;
	let part1 = email.split("@");

	var pattern = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);

	if( pattern.test(phone) ){
		document.getElementById("phone").className = "";
    } else {
		document.getElementById("phone").className = "red-border";
		errors++;
        }
    if ( (re.test(email))&& (part1[1]=="post.bgu.ac.il")){
		document.getElementById("email").className = "";
	} else {
		document.getElementById("email").className = "red-border";
		errors++;
	}
	if (fName == "") {
		document.getElementById("fullname").className = "red-border";
		errors++;
	} else {
		document.getElementById("fullname").className = "";
	}
	if (destination == ""){
		document.getElementById("dest").className = "red-border";
		errors++;		
	} else {
		document.getElementById("dest").className = "";
	}
	if (long==0){
		document.getElementById("longitude").className = "red-border";
		errors++;				
	} else {
		document.getElementById("longitude").className = "";		
	}
	if (lat==0){
		document.getElementById("latitude").className = "red-border";
		errors++;				
	} else {
		document.getElementById("latitude").className = "";		
	}
	if (errors == 0){
		
			return true;
		
	}
	else {
		let err = document.getElementById("errbox");
		err.innerHTML = "Fields highligted in red are not valid! Must Allow Location to use services! Go to help page for more info.<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
	}
}

//validates existing Hitchhiker form before submitting to database
function validateSignInForm(){
	let email = document.forms["hsignin"]["email"].value;
	let phone = document.forms["hsignin"]["phone"].value;
	var errors = 0;
	var re = /\S+@\S+\.\S+/;
	let part1 = email.split("@");

	var pattern = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);

	if( pattern.test(phone) ){
		document.getElementById("phone").className = "";
    } else {
		document.getElementById("phone").className = "red-border";
		errors++;
        }
    if ( (re.test(email))&& (part1[1]=="post.bgu.ac.il")){
		document.getElementById("email").className = "";
	} else {
		document.getElementById("email").className = "red-border";
		errors++;
	}
	if (errors == 0){
		return true;
			
	}
	else {
		let err = document.getElementById("errbox");
		err.innerHTML = "Fields highligted in red are not valid! Go to help page for more info.<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
	}
	
}

/*API used to get geolocation from browser/user */
function GetLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log("in get location");
        navigator.geolocation.getCurrentPosition(showPosition);
		
    } else {
        let err = document.getElementById("errbox");
		err.innerHTML = "Geolocation is not supported<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
    }
};

function showPosition(position) {
    var x = document.getElementById('latitude');
    var y = document.getElementById("longitude");
    x.value =  position.coords.latitude;
    y.value = position.coords.longitude;
	console.log(x.value);
	console.log(y.value);
	return true;
}

//used to get timestamp
function currentTime(){
	var time = document.getElementById('timestamp');
	time.value = Date.now();
	console.log(time.value);
}

/* functions used for RWD in main template/layout */
function w3_open() {
	document.getElementById("mySidenav").style.display = "block";
  }
  function w3_close() {
	document.getElementById("mySidenav").style.display = "none";
  }
  function openHelp(){
	  window.open("help.txt", "Help", "_blank");
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

	
function validateDriverForm(){
	
	let fName = document.forms["driver"]["fullname"].value;
	let email = document.forms["driver"]["email"].value;
	let phone = document.forms["driver"]["phone"].value;
	let destination = document.forms["driver"]["dest"].value;
	let seats = document.forms["driver"]["seats"].value;
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
	if (errors == 0){
		if(GetLocation()==true){
			return true;	
		}
		else 
			return false;
		
	}
	else {
		let err = document.getElementById("errbox");
		err.innerHTML = "Fields highligted in red are not valid! Go to help page for more info.<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
	}


}

function validateHHikerForm(){
	
	let fName = document.forms["hhiker"]["fullname"].value;
	let email = document.forms["hhiker"]["email"].value;
	let phone = document.forms["hhiker"]["phone"].value;
	let destination = document.forms["hhiker"]["dest"].value;
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
	if (errors == 0){
		if(GetLocation()==true){
			return true;	
		}
		else 
			return false;
		
	}
	else {
		let err = document.getElementById("errbox");
		err.innerHTML = "Fields highligted in red are not valid! Go to help page for more info.<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
	}
}

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
		if(GetLocation()==true){
			return true;	
		}
		else 
			return false;
		
	}
	else {
		let err = document.getElementById("errbox");
		err.innerHTML = "Fields highligted in red are not valid! Go to help page for more info.<br><br> <small>Click the message to close.</small>";
		err.className = "errmsg";
		return false;
	}
	
}

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
function onBodyLoad()
{		
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	// do your thing!
	var photodb = window.opendatabase("photos","1.0","Photo Database",100000);
	 	photodb.transaction(getPhotos, onDBError); 	
}

// DB calls

function onDBError (tx) {
	 console.log("Error processing SQL: "+err.code);
}

function getPhotos (tx) {
	tx.executeSql('SELECT * FROM PHOTOS',[],onGetPhotoSuccess,onDBError);
}

function onGetPhotoSuccess(tx,results) {
	console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    console.log("Insert ID = " + results.rows.length);
}


// Camera

function getCamera()
{
	// for testing in browser
	/***
	document.getElementById('photo').className = 'visible';
	document.getElementById('camerabutton').className = "hidden";
	***/

	var options = {
		quality: 50,
		destinationType : Camera.DestinationType.FILE_URI,
		allowEdit: true,
		encodingType: Camera.EncodingType.JPEG 
	}

	// Start grabbing the lat/lon coordinates
	navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
	navigator.camera.getPicture(onSuccess, onFail,options);


}


function onSuccess(imageData) {

    var image = document.getElementById('image');
    	image.src = imageData;
    
	document.getElementById('photo').className = 'visible';
	document.getElementById('camerabutton').className = "hidden";
	
    // image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
	document.getElementById('message').innerHTML = message;
}

// Geolocation

function onGeoSuccess (position) {
	//position.coords.latitude
}

function onGeoError (error) {
	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}


// UI stuff

function titleclick () {
	var input = document.createElement('input');
		input.id = "titleinput";
		input.addEventListener('blur',onblur);

	var title = document.getElementById('imagetitle');
		title.className = "hidden";
	
	document.getElementById('photo').appendChild(input);
	document.getElementById('titleinput').focus();
		

}

function onblur(e) {
	// console.log('test');
	var title = document.getElementById('imagetitle');
		title.innerHTML = document.getElementById('titleinput').value;

	titleinput = document.getElementById('titleinput');
	document.getElementById('photo').removeChild(titleinput);


	title.className = "visible";
}

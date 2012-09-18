var photodb;

function onBodyLoad() 
{		
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	// do your thing!
	photodb = window.opendatabase("photos","1.0","Photo Database",100000);
	photodb.transaction(getTable, onDBError, onGetTableSuccess);
	 	
}

// DB calls

function onDBError (tx) 
{
	 console.log("Error processing SQL: "+err.code);
}

function getTable (tx) 
{
	navigator.notification.alert("DB call is trying");
	tx.executeSql('CREATE TABLE IF NOT EXISTS PHOTOS (id unique, file_uri, title)');
	tx.executeSql('INSERT INTO PHOTOS (id, file_uri, title) VALUES (1, "file://blah.1", "First Photo")');
 	tx.executeSql('INSERT INTO PHOTOS (id, file_uri, title) VALUES (2, "file://blah.2", "Second Photo")');
}

function onGetTableSuccess () {
	photodb.transaction(getPhotos, onDBError); 	
}

function getPhotos (tx) {
	console.log('getting photos');
	tx.executeSql('SELECT * FROM PHOTOS',[],onGetPhotoSuccess,onDBError);
}

function onGetPhotoSuccess(tx,results) {
	console.log(results.rows.item(0));
}


// Camera

function getCamera()
{
	// ****** for testing in browser ******
	// document.getElementById('takephoto').className = 'animate';
	// document.getElementById('photodetail').className = 'animate';
	// photodb = window.openDatabase("photos","1.0","Photo Database",1000000);
	// photodb.transaction(getTable, onDBError, onGetTableSuccess);

	// var storage = window.localstorage;


	// ****** end browser test *******

	var options = {
		quality: 50,
		destinationType : Camera.DestinationType.FILE_URI,
		allowEdit: true
	}

	// Start grabbing the lat/lon coordinates
	navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoError);
	navigator.camera.getPicture(onSuccess, onFail,options);


}


function onSuccess(imageData) {

    var image = document.getElementById('image');
    	image.src = imageData;
    
	document.getElementById('takephoto').className = 'animate';
	document.getElementById('photodetail').className = 'animate';
	
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


// Showing the camera
function showCamera () {
	document.getElementById('photoslideholder').className = "";
	document.getElementById('photolist').className = "e";
}

// The photo list

function showPhotoList () {
	document.getElementById('photoslideholder').className = "animate";
	document.getElementById('photolist').className = "animate";
}

var httpRequest;
var settings = null;
var out = "";
var gistArray = [];
// local storage init
window.onload = function(){
	 
	var settingsStr = localStorage.getItem("userSettings");
	if (settingsStr === null){
		settings = {"gists":[]};
		localStorage.setItem("userSettings", JSON.stringify(settings));
	}
	else{
		settings = JSON.parse(settingsStr);
	}
	createLocalList(document.getElementById("favs"));
}


function createLocalList(){
	var ul = document.getElementById("favs");
	var li = document.createElement("li");
	
	li.innerHTML = localStorage.getItem("userSettings");
	ul.appendChild(li);
}


function Gist(page){
	this.baseurl = 'https://api.github.com/gists/public';
    this.url = this.baseurl + '?page=' + page;
  	this.stringy = "";
    this.request = function(){ 
    	if (window.XMLHttpRequest){
			httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject){
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}

		if (!httpRequest){
			alert('Giving up. Cannot make a request.');
			return false;
		}
		return httpRequest;
	}
}


document.getElementById("search").onclick = function(){
	if (document.getElementById("gistList").innerHTML != ""){
		document.getElementById("gistList").innerHTML = "";
	}
	var pages = document.getElementsByName("howMany")[0];
	
	if (pages.selectedIndex == -1){
		makeRequest('https://api.github.com/gists/public?page=1');
	}
	else{
		if (pages.value == 6){
			alert("Cannot search for 6 pages.");
		}
		else{
			for (var i = 0; i < pages.value; i++){
				var result = new Gist(i + 1);
				makeRequest(result);
			}
		}
	} 

}
//makes request then grabs link/description
function makeRequest(url){
	var newReq = url.request();
	newReq.onreadystatechange = function alertContents(){
		if (newReq.readyState === 4){
			if (newReq.status === 200){
				var responseArray= JSON.parse(newReq.responseText,  mimetype="text/html");
				var pages = document.getElementsByName("howMany")[0];
				checkArray(responseArray);
				

			} else {
				alert('There was a problem with the request.');
			}
		}
	}
	httpRequest.open('GET', url.url);
	httpRequest.send();
}


function clearLocalStorage(){
	localStorage.clear();
}

//filter system
function checkArray(responseArray){
	
	var link = "";
	var favButton = '<input type="button" id="checkme" > Favorite ';
	var lynk;
	var newObj = document.getElementById("gistList");
	for (var x in responseArray){
		var object = responseArray;			
		for (var y in object[x].files){
			var obj2 = object[x].files;

			if (document.getElementById("JSON").checked == true){
							
				if (object[x].files[y].language == "JSON"){
					if(typeof responseArray[x].description == "undefined" || typeof responseArray[x].description == "null" || responseArray[x].description == ""){
						lynk = '<a href="' + responseArray[x].html_url + '">' + "No Description" + '</a><br>';
						out = favButton + lynk;
						gistArray.push(out);
						var item = document.createElement("li");
						
						item.innerHTML = out;
						newObj.appendChild(item);
					}
					else{
						
						link = '<a href="' + responseArray[x].url + '">' + responseArray[x].description + '</a><br>';
						out = favButton + link;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
					
				}
			}
			else if (document.getElementById("JAVASCRIPT").checked == true){
				if (object[x].files[y].language == "JavaScript"){
					if(typeof responseArray[x].description == "undefined" || typeof responseArray[x].description == "null" || responseArray[x].description == ""){
						lynk = '<a href="' + responseArray[x].html_url + '">' + "No Description" + '</a><br>';
						out = favButton + lynk;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
					else{

						link = '<a href="' + responseArray[x].html_url + '">' + responseArray[x].description + '</a><br>';
						out = favButton + link;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
				}
			}
			else if (document.getElementById("PYTHON").checked == true){
				if (object[x].files[y].language == "Python"){
					if(typeof responseArray[x].description == "undefined" || typeof responseArray[x].description == "null" || responseArray[x].description == ""){
						lynk = '<a href="' + responseArray[x].html_url + '">' + "No Description" + '</a><br>';
						out = favButton + lynk;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
					else{
						link = '<a href="' + responseArray[x].html_url + '">' + responseArray[x].description + '</a><br>';
						out = favButton + link;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
				}
			}
			else if (document.getElementById("SQL").checked == true){
				if (object[x].files[y].language == "SQL"){
					if(typeof responseArray[x].description == "undefined" || typeof responseArray[x].description == "null" || responseArray[x].description == ""){
						lynk = '<a href="' + responseArray[x].html_url + '">' + "No Description" + '</a><br>';
						out = favButton + lynk;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
					else{
						link = '<a href="' + responseArray[x].html_url + '">' + responseArray[x].description + '</a><br>';
						out = favButton + link;
						gistArray.push(out);
						var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
					}
				}
			}
			else{ 
				if(typeof responseArray[x].description == "undefined" || typeof responseArray[x].description == "null" || responseArray[x].description == ""){
					lynk = '<a href="' + responseArray[x].html_url + '">' + "No Description" + '</a><br>';
					out = favButton + lynk;
					gistArray.push(out);
					var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
				}
				else{
					link = '<a href="' + responseArray[x].html_url + '">' + responseArray[x].description + '</a><br>';
					out = favButton + link;
					gistArray.push(out);
					var item = document.createElement("li");
						item.innerHTML = out;
						newObj.appendChild(item);
				}
			}
		}	

	}
	document.getElementById("checkme").onclick = function addGist(){
		settings.gists.push(out);
		localStorage.setItem("userSettings", JSON.stringify(settings));
		settings = JSON.parse(settingsStr);
		createLocalList();
	}
	//createGistList(document.getElementById("gistList"));
	return gistArray;
}
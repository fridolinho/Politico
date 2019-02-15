function newParty() {
  var x = document.getElementById("new_party");
    x.style.display = "block";
 
};

function newOffice() {
  var x = document.getElementById("new_office");
    x.style.display = "block";
  
};

function editParty() {
  var x = document.getElementById("edit_party");
    x.style.display = "block";
};

function showMember() {
  var x = document.getElementById("members");
    if(x.style.display != "block"){
    	x.style.display = "block";
    } else {
    	x.style.display = "none";
    }
};

function deleteParty(){
	var x = document.getElementById("confirm");
		x.style.display = "block"; 
		console.log("deleteParty");
};

function closeModal(){
	var x = document.getElementById('new_office');
	var y = document.getElementById('new_party');
	var z = document.getElementById('edit_party');
	var q = document.getElementById('confirm');
		x.style.display = "none";
		y.style.display = "none";
		z.style.display = "none";
		q.style.display = "none";
}




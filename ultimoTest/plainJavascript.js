

function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";      
    } else {
        x.className = x.className.replace(" w3-show", "");

    }
}





// Get the Sidenav
var mySidenav = document.getElementById("mySidenav");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidenav, and add overlay effect
function w3_open() {
  var mySidenav = document.getElementById("mySidenav");
  var overlayBg = document.getElementById("myOverlay");


    if (mySidenav.style.display === 'block') {
        mySidenav.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidenav.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidenav with the close button
function w3_close() {
  var mySidenav = document.getElementById("mySidenav");
  var overlayBg = document.getElementById("myOverlay");
    mySidenav.style.display = "none";
    overlayBg.style.display = "none";
}

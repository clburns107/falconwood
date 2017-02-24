//opens full screen overlay
function openOverlay() {
  $("#homepage-overlay").css('height', '100%');
}

//closes full screen overlay
function closeOverlay() {
  $("#homepage-overlay").css('height', '0%');
}


/* Set the width of the side navigation to 250px */
function openNav() {
  $("#mySidenav").css('width', '250px');
    // document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  $("#mySidenav").css('width', '0px');
    // document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {
  openOverlay();   
});
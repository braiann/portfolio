var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function enable_visibility(id) {
  var e = document.getElementById(id);
  console.log(e.style);
  e.style.display = "block";
  setTimeout(() => {e.style.opacity = 1;}, 100);
}

function disable_visibility(id) {
  var e = document.getElementById(id);
  e.style.opacity = 0;
  setTimeout(() => {e.style.display = "none";}, 1000);
}

function change_color(id, bottom, padding){
  var e = document.getElementById(id);
  e.style.bottom = bottom;
  document.getElementById("nav-bar").style.padding = padding;
}
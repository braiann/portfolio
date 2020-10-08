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
  e.style.display = "block";
  setTimeout(() => {e.style.opacity = 1;}, 10);
}

function disable_visibility(id) {
  var e = document.getElementById(id);
  e.style.opacity = 0;
  setTimeout(() => {e.style.display = "none";}, 300);
}

function change_color(id, bottom, padding){
  var e = document.getElementById(id);
  
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width > 600)
  {
    e.style.bottom = bottom;
    document.getElementById("nav-bar").style.padding = padding;
  }
}
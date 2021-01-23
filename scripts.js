window.addEventListener('resize', () => {
  const mediaQuery = window.matchMedia("(max-width: 758px)")
  if (mediaQuery.matches) {
    disable_visibility('content');
    enable_visibility('home');
    change_color('logo', 'calc(100% - 6.5rem)', '1rem 1rem 1.5rem 1.5rem');
  }
})

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      this.firstChild.setAttribute("style", "transform: rotate(90deg)");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.firstChild.setAttribute("style", "transform: rotate(180deg)");
    }
  });
}

function enable_visibility(id) {
  let e = document.getElementById(id);
  e.style.display = "block";
  setTimeout(() => {e.style.opacity = 1;}, 10);
}

function disable_visibility(id) {
  let e = document.getElementById(id);
  e.style.opacity = 0;
  setTimeout(() => {e.style.display = "none";}, 300);
}

function change_color(id, bottom, padding){
  let e = document.getElementById(id);
  
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width > 600)
  {
    e.style.bottom = bottom;
    document.getElementById("nav-bar").style.padding = padding;
  }
}
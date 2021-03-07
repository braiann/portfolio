window.addEventListener('resize', () => {
  const mediaQuery = window.matchMedia("(max-width: 758px)");
  // resets the website appearance if the breakpoint is crossed to avoid UI errors
  if (mediaQuery.matches) {
    disableVisibility('content');
    enableVisibility('home');
    changeColor('logo', 'calc(100% - 6.5rem)', '1rem 1rem 1.5rem 1.5rem');
    showAllSections();
    enableMobileScroll();
  }
})

function enableMobileScroll() {
  window.addEventListener('scroll', () => {
    const introduccion = document.getElementById("introduccion");
    if (window.scrollY + window.innerHeight > introduccion.offsetTop) {
      introAnimation();
    }
  })
}
if (window.matchMedia("(max-width: 758px)").matches) {
  enableMobileScroll();
}

let coll = document.getElementsByClassName("collapsible");
let i;
// collapsible expand on click logic
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

// handles switching between sections of the website
async function switchTo(sectionID) {
  changeColor('logo', '0', '2rem 1rem 2rem 6.5rem');
  disableVisibility("home");
  highlightButton(sectionID + "-btn");
  await (hideAllSections());
  document.getElementById("content").style.margin = "auto";
  setTimeout(() => {
    enableVisibility("content");
    enableVisibility(sectionID);
  }, 400);
}

function enableVisibility(id) {
  let e = document.getElementById(id);
  e.style.display = id === "proyectos" ? "flex" : "block";
  setTimeout(() => {e.style.opacity = 1;}, 10);
}

function disableVisibility(id) {
  let e = document.getElementById(id);
  e.style.opacity = 0;
  setTimeout(() => {e.style.display = "none";}, 300);
}

function changeColor(id, bottom, padding){
  let e = document.getElementById(id);
  
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width > 600)
  {
    e.style.bottom = bottom;
    document.getElementById("nav-bar").style.padding = padding;
  }
}

function highlightButton(buttonID) {
  unHighlightAllButtons()
  const button = document.getElementById(buttonID)
  setTimeout(()=> {
    button.style.fontVariationSettings = "'wdth' 100, 'wght' 700";
    button.style.opacity = 1
  }, 0);
}



const sectionIDs = ["introduccion", "proyectos", "curriculum", "contacto"];

function hideAllSections() {
  new Promise((resolve, reject) => {
    for (let i = 0; i < sectionIDs.length; i++) {
      
      let currentSection = document.getElementById(sectionIDs[i]);
      const content = document.getElementById("content");
      
      currentSection.style.opacity = 0;
      setTimeout(() => resolve(currentSection.style.display = "none"), 300);
    }
  })
};

function showAllSections() {
  for (let i = 0; i < sectionIDs.length; i++) {
    let currentSection = document.getElementById(sectionIDs[i]);
    currentSection.style.display = currentSection.id === "proyectos" ? "flex" : "block";
    currentSection.style.opacity = 1;
  }
}

function unHighlightAllButtons(){
  const navBarButtons = document.getElementsByClassName("navbar-btn");
  for (let i = 0; i < navBarButtons.length; i++) {
    navBarButtons.item(i).style.fontVariationSettings = "'wdth' 75, 'wght' 400";
    navBarButtons.item(i).style.opacity = ".82";
  }
}
window.addEventListener('load', () => {
  window.animationExcecuted = false;
  // animate navbar buttons appearing
  let navbarButtons = document.getElementById("nav-bar").children;
  for (let i = 0; i < navbarButtons.length; i++) {
      navbarButtons.item(i).style.opacity = 0;
      setTimeout(() => navbarButtons.item(i).style.opacity = 1, i*100)
  }

  // show video and then static image of my signature
  setTimeout(() => {
    const imageSignature = document.getElementById("img-signature");
    imageSignature.style.display = "inline-block";
  }, 2000) 
  setTimeout(() => {
    document.getElementById("img-signature").style.opacity = "1";
    document.getElementById("video-signature").style.opacity = "0";
  }, 2010);
});

// show a preview popup for projects
function showPeek(iconID, id, event) {
  if (window.matchMedia("(min-width: 758px)").matches) {
    try {
    clearTimeout(hidePeekTimeout);
    } catch {}
    let element = document.getElementById(id);
    element.style.visibility = "hidden";
    const icon = document.getElementById(iconID)
    element.style.visibility = "visible";
    element.style.top = icon.offsetTop - 25 + "px";
    element.style.left = icon.offsetLeft + icon.offsetWidth + "px";
    element.style.opacity = "1";
    element.style.marginLeft = "2rem";
    element.style.transform = "scale(1)";
  }
}

// hide preview popup for projects
function hidePeek(id) {
  let element = document.getElementById(id);
  element.style.transform = "scale(0.2)";
  element.style.marginLeft = "-5rem";
  element.style.opacity = "0";
  hidePeekTimeout = setTimeout(() => element.style.visibility = "hidden", 300);
}

const icons = [
  ["subtitle", "subtitle-peek"],
  ["academia-icon", "academia-peek"],
  ["nutricionista-icon", "nutricionista-peek"], // list of projects with previews. Add new projects here when created.
  ["pong-icon", "pong-peek"],
  ["speller-icon", "speller-peek"] 
];

// populates mouseover event for every icon that has a popup from the list.
for (let i = 0; i < icons.length; i++) {
  const icon = document.getElementById(icons[i][0]);
  try {
    icon.addEventListener("mouseover", (event) => {
      showPeek(icons[i][0], icons[i][1], event);
    })
  } catch {}
  try {
    icon.addEventListener("mouseout", (event) => {
      hidePeek(icons[i][1]);
    })
  } catch {}
}

// timer function
const timer = ms => new Promise(res => setTimeout(res, ms))

let subtitles;
let subtitlePeeks;
let currentSubtitle = document.getElementById("subtitle");
let currentSubtitlePeek = document.getElementById("subtitle-peek");

if (window.location.href.includes("/en/")) {
  subtitles = ["Student", "Developer", "Designer"];
  subtitlePeeks = ["Majoring in Software Engineering 💻", "Mostly for the web", "UI and UX"];
} else {
  subtitles = ["Estudiante", "Desarrollador", "Diseñador"];
  subtitlePeeks = ["De Sistemas de Información 💻", "Mayormente web", "De UI y UX"];
}

// animate between subtitles from the list above
async function showSubtitle() {
  for (let i = 0; i < subtitles.length; i++) {
    currentSubtitle.style.opacity = 0;
    hidePeek("subtitle-peek");
    setTimeout(() => {
      currentSubtitle.innerText = subtitles[i];
      currentSubtitle.style.opacity = 1;
      currentSubtitlePeek.childNodes.item(1).innerText = subtitlePeeks[i];
    }, 500)
    await (timer(4000));

    if (i == subtitles.length - 1) {
      i = -1;
    }
  }
}
showSubtitle();

async function introAnimation() {
  if (!window.animationExcecuted) {
    window.animationExcecuted = true;
    const introParagraphs = document.getElementsByClassName("intro-text");
    for (let i = 0; i < introParagraphs.length; i++) {
      const current = introParagraphs.item(i);
      current.setAttribute("style", `opacity: .82 !important; font-size: 1.25rem;`);
      try {
        if (!introParagraphs.item(i + 1).classList.contains("emphasis")){
          await (timer(1000));
        } else {
          await (timer(500));
        }
      } catch {}
      if (current.classList.contains("emphasis")) {
        current.style.fontSize = "1.75rem";
        current.style.fontWeight = "800";
      }
    }
  }
}
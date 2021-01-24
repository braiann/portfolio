window.addEventListener('load', () => {
    let navbarButtons = document.getElementById("nav-bar").children;
    for (let i = 0; i < navbarButtons.length; i++) {
        navbarButtons.item(i).style.opacity = 0;
        setTimeout(() => navbarButtons.item(i).style.opacity = 1, i*100)
    }
    setTimeout(() => {
      const videoSignature = document.getElementById("video-signature");
      const imageSignature = document.getElementById("img-signature");
      imageSignature.style.display = "inline-block";
    }, 2000) 
    setTimeout(() => {
      document.getElementById("img-signature").style.opacity = "1";
      document.getElementById("video-signature").style.opacity = "0";
    }, 2010);
});

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

function hidePeek(id) {
  let element = document.getElementById(id);
  element.style.transform = "scale(0.2)";
  element.style.marginLeft = "-5rem";
  element.style.opacity = "0";
  hidePeekTimeout = setTimeout(() => element.style.visibility = "hidden", 300);
}

const icons = [
  ["academia-icon", "academia-peek"],
  ["nutricionista-icon", "nutricionista-peek"],
];

for (let i = 0; i < icons.length; i++) {
  const icon = document.getElementById(icons[i][0]);
  icon.addEventListener("mouseover", (event) => {
    showPeek(icons[i][0], icons[i][1], event);
  })
  icon.addEventListener("mouseout", (event) => {
    hidePeek(icons[i][1]);
  })
}

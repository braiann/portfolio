let navbarButtons = document.getElementById("nav-bar").children;
for (let i = 0; i < navbarButtons.length; i++) {
    navbarButtons.item(i).style.opacity = 0;
    setTimeout(() => navbarButtons.item(i).style.opacity = 1, i*100)
}


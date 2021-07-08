window.onload = () => {
    
    appDemoCarousel();
};

// Every 3 seconds it switches between the two demo images from the app, also
// switching the surrounding computer frame and text color
function appDemoCarousel() {
    const greenComputer = document.getElementById('green-computer');
    const pinkComputer = document.getElementById('pink-computer');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const coloredRoleName = document.getElementById('colored-role-name');
    const coloredRoleNameM = document.getElementById('colored-role-name-m');
    setInterval(function(){
        if (coloredRoleName.innerHTML == "nutricionistas") {
            screen1.style.opacity = 1;
            screen2.style.opacity = 0;
            coloredRoleName.innerHTML = "pacientes";
            coloredRoleName.style.color = "#2bbd7e";
            coloredRoleNameM.innerHTML = "pacientes";
            coloredRoleNameM.style.color = "#2bbd7e";
            greenComputer.classList.remove("gone-to-right");
            pinkComputer.classList.add("gone-to-left");
        } else {
            screen1.style.opacity = 0;
            screen2.style.opacity = 1;
            coloredRoleName.innerHTML = "nutricionistas";
            coloredRoleName.style.color = "#c50e29";
            coloredRoleNameM.innerHTML = "nutricionistas";
            coloredRoleNameM.style.color = "#c50e29";
            greenComputer.classList.add("gone-to-right");
            pinkComputer.classList.remove("gone-to-left");
        }
    }, 3000);
}
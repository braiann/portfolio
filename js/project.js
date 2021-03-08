setTimeout(()=>toggle_video_description(), 3000);

function toggle_video_description()
{
    const content = document.getElementById("content");
    const logo = document.getElementById("logo")
    const mediaQuery = window.matchMedia("(min-width: 758px)");
    if (mediaQuery.matches) {
        if (window.getComputedStyle(content).opacity == 1) {
            content.style.opacity = 0;
            logo.style.opacity = 0;
        } else {
            content.style.opacity = 1;
            logo.style.opacity = 1;
        }
    } else {
        content.style.opacity = 1;
        logo.style.opacity = 1;
    }
}

window.addEventListener('resize', () => toggle_video_description());
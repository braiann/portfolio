setTimeout(()=>toggle_video_description(), 3000);

function toggle_video_description()
{
    const content = document.getElementById("content");
    const logo = document.getElementById("logo")
    if (window.getComputedStyle(content).opacity == 1) {
        content.style.opacity = 0;
        logo.style.opacity = 0;
    } else {
        content.style.opacity = 1;
        logo.style.opacity = 1;
    }
}
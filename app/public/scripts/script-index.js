const hero = document.querySelector(".hero");
const heroVideo = document.querySelector(".hero-video");

if (hero && heroVideo) {
    heroVideo.addEventListener("ended", () => {
        hero.classList.add("show");
    });
}
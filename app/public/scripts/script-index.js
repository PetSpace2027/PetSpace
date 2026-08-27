const video = document.getElementById("heroVideo");
const hero = document.querySelector(".hero");

video.addEventListener("ended", () => {
    hero.classList.add("show");

});
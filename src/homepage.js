document.addEventListener("DOMContentLoaded", function () {
    const pokeball = document.querySelector(".pokeball");

    pokeball.addEventListener("click", function () {
        pokeball.style.animation = "rollOut 1.5s ease-in forwards";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const pokeball = document.querySelector(".pokeball");

    pokeball.addEventListener("click", function () {
        // Apply the rollout animation to pokeball
        pokeball.style.animation = "rollOut 1.5s ease-in forwards";
        // Once animation is finished, redirect to ./teambuilder
        pokeball.addEventListener("animationend", function (event) {
            if (event.animationName === "rollOut") {
                window.location.href = "./teambuilder.html";
            }
        }, { once: true }); // Prevents the event from occuring more than once
    });
});
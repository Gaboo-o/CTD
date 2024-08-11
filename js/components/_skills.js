export function initializeSkills(data) {
    // Title
    const title = document.querySelector(".skills-title");
    title.innerHTML = data.title;

    // Sliders
    const sliders = document.querySelectorAll(".slider");

    data.list.forEach((item) => {
        const skillTag = document.createElement("img");
        skillTag.classList.add("skill-tag");
        skillTag.src = item.src;
        skillTag.alt = item.alt;

        sliders.forEach((slider, index) => {
            const sliderInner = slider.querySelector(".slider-inner");
            sliderInner.style.animationDuration = data.settings[index].duration;
            sliderInner.style.animationDirection = data.settings[index].direction;

            for (let i = 0; i < 4; i++) { //loop effect
                sliderInner.appendChild(skillTag.cloneNode(true));
            }
        });
    });
}
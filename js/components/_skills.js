export function initializeSkills(data) {
    // Title
    const title = document.querySelector(".skills-title");
    title.innerHTML = data.title;

    // Skills container
    const skillsContainer = document.querySelector(".skills-container");

    Object.entries(data.list).forEach(([category, items], index) => {
        const slider = document.createElement("div");
        slider.classList.add("slider");

        const sliderTitle = document.createElement("p");
        sliderTitle.classList.add("slider-title");
        sliderTitle.innerHTML = category;

        const sliderInner = document.createElement("div");
        sliderInner.classList.add("slider-inner");

        const sliderItems = document.createElement("div");
        sliderItems.classList.add("slider-items");

        if (index % 2 === 0) {
            sliderInner.style.borderLeft = `5px solid var(--border-color)`;
            sliderItems.style.animationDirection = "reverse";
        } else {
            sliderInner.style.borderRight = `5px solid var(--border-color)`;
            slider.style.flexDirection = "row-reverse";
            sliderItems.style.animationDirection = "normal";
        }

        sliderItems.style.animationDuration = `${60 / items.length}s`;

        items.forEach(item => {
            const itemImg = document.createElement("img");
            itemImg.classList.add("skill-icon");
            itemImg.src = item.src;
            itemImg.alt = item.alt;

            sliderItems.appendChild(itemImg);
        });

        slider.appendChild(sliderTitle);
        sliderInner.appendChild(sliderItems);
        slider.appendChild(sliderInner);

        skillsContainer.appendChild(slider);
    });
}

// for (const [category, items] of Object.entries(data.list)) {
//     const slider = document.createElement("div");
//     slider.classList.add("slider");

//     const sliderTitle = document.createElement("p");
//     sliderTitle.classList.add("slider-title");
//     sliderTitle.innerHTML = category;

//     const sliderItems = document.createElement("div");
//     sliderItems.classList.add("slider-title");   
//     sliderItems.style.animationDuration = data.settings[index % data.settings.length].duration;
//     sliderItems.style.animationDirection = data.settings[index % data.settings.length].direction;

//     items.forEach( item => {
//         const itemImg = document.createElement("img");
//         itemImg.classList.add("skill-icon");
//         itemImg.src = item.src;
//         itemImg.alt = item.alt;

//         slider.appendChild(itemImg);
//     });
// }
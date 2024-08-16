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
        sliderTitle.innerHTML = category.charAt(0).toUpperCase() + category.slice(1);

        const sliderInner = document.createElement("div");
        sliderInner.classList.add("slider-inner");

        const sliderItems = document.createElement("div");
        sliderItems.classList.add("slider-items");

        items.forEach(item => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("skill-icon-container");

            const itemImg = document.createElement("img");
            itemImg.classList.add("skill-icon");
            itemImg.src = item.src;
            itemImg.alt = item.alt;

            const hoverText = document.createElement("div");
            hoverText.classList.add("skill-icon-hover-text");
            hoverText.textContent = item.alt;

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(hoverText);
            sliderItems.appendChild(itemContainer);
        });

        if (index % 2 === 0) {
            sliderInner.style.borderLeft = `5px solid var(--border-color)`;
            sliderItems.style.animationDirection = "normal";
        } else {
            sliderInner.style.borderRight = `5px solid var(--border-color)`;
            slider.style.flexDirection = "row-reverse";
            sliderItems.style.animationDirection = "reverse";
        }

        for (let i = 0; i < 6; i++) { //caveman solution
            sliderInner.appendChild(sliderItems.cloneNode(true));
        }
            
        slider.appendChild(sliderTitle);
        slider.appendChild(sliderInner);

        skillsContainer.appendChild(slider);
    });
}
export function initializeHiddenAbout(data) {
    /** Hidden About **/
    const hiddenAboutData = data.hiddenAbout;

    // Hidden About container
    const hiddenAbout = document.querySelector(".hidden-about");

    // Details
    const details = document.querySelector(".hidden-about-content p");
    details.innerHTML = hiddenAboutData.details.replace("\n", "<br>");
    
    // Toggle button
    const toggleAboutContainer = document.querySelector(".toggle-about-container");
    const toggleAbout = document.querySelector(".toggle-about-img");
    toggleAbout.src = hiddenAboutData.toggleOutline.src;
    toggleAbout.alt = hiddenAboutData.toggleOutline.alt;

    let isActive = false;

    toggleAbout.addEventListener("click", () => {
        hiddenAbout.classList.toggle("active");

        if (!isActive) {
            toggleAboutContainer.style.borderTop = "var(--border-size-hover) solid transparent";
            toggleAboutContainer.style.borderBottom = "var(--border-size-hover) solid var(--border-color)";

            toggleAbout.style.transform = "rotate(-90deg)";
            toggleAbout.style.marginTop = "1em";

            smoothScrollTo(hiddenAbout);
        }
        else {
            toggleAboutContainer.style.borderTop = "var(--border-size) solid var(--border-color)";
            toggleAboutContainer.style.borderBottom = "var(--border-size) solid transparent";

            toggleAbout.style.transform = "rotate(90deg)";
            toggleAbout.style.marginTop = "-1em";
        }

        isActive = !isActive;
    });

    toggleAbout.addEventListener("open", () => {
        if (!isActive) {
            toggleAbout.click()
        }
    })

    // Border color
    toggleAbout.addEventListener("mouseover", () => {
        if (!isActive) {
            toggleAboutContainer.style.borderTopWidth = "var(--border-size-hover)";
            toggleAboutContainer.style.borderBottomWidth = "var(--border-size-hover)";
            toggleAbout.src = hiddenAboutData.toggleFill.src;
        }
        else {
            toggleAboutContainer.style.borderTopWidth = "var(--border-size)";
            toggleAboutContainer.style.borderBottomWidth = "var(--border-size)";
            toggleAbout.src = hiddenAboutData.toggleFill.src;
        }
    });

    toggleAbout.addEventListener("mouseout", () => {
        if (!isActive) {
            toggleAboutContainer.style.borderTopWidth = "var(--border-size)";
            toggleAboutContainer.style.borderBottomWidth = "var(--border-size)";
            toggleAbout.src = hiddenAboutData.toggleOutline.src;
        }
        else {
            toggleAboutContainer.style.borderTopWidth = "var(--border-size-hover)";
            toggleAboutContainer.style.borderBottomWidth = "var(--border-size-hover)";
            toggleAbout.src = hiddenAboutData.toggleOutline.src;
        }
    });
}

export function smoothScrollTo(element, offset = 200, duration = 1000) {
    // Absolute position
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // console.log(`targetPosition: ${element.getBoundingClientRect().top}`);
    // console.log(`startPosition: ${startPosition}`);
    // console.log(`distance: ${distance}`);

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const normalizedTimeElapsed = timeElapsed / duration;
        const position = startPosition + (distance * normalizedTimeElapsed);

        // console.log(`timeElapsed: ${timeElapsed}`);
        // console.log(`normalizedTimeElapsed: ${normalizedTimeElapsed}`);
        // console.log(`position: ${position}`);

        window.scrollTo(0, position);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
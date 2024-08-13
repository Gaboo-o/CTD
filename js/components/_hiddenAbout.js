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
    const toggleAbout = document.querySelector(".toggle-about-text");
    toggleAbout.innerHTML = hiddenAboutData.toggleOpen.outline;

    let isActive = false;

    toggleAbout.addEventListener("click", () => {
        hiddenAbout.classList.toggle("active");

        if (!isActive) {
            toggleAboutContainer.style.borderTop = "10px solid transparent";
            toggleAboutContainer.style.borderBottom = "10px solid var(--border-color)";

            toggleAbout.innerHTML = hiddenAboutData.toggleClose.outline;

            smoothScrollTo(hiddenAbout);
        }
        else {
            toggleAboutContainer.style.borderTop = "5px solid var(--border-color)";
            toggleAboutContainer.style.borderBottom = "5px solid transparent";

            toggleAbout.innerHTML = hiddenAboutData.toggleOpen.outline;
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
            toggleAboutContainer.style.borderTopWidth = "10px";
            toggleAboutContainer.style.borderBottomWidth = "10px";
            toggleAbout.innerHTML = hiddenAboutData.toggleOpen.fill;
        }
        else {
            toggleAboutContainer.style.borderTopWidth = "5px";
            toggleAboutContainer.style.borderBottomWidth = "5px";
            toggleAbout.innerHTML = hiddenAboutData.toggleClose.fill;
        }
    });

    toggleAbout.addEventListener("mouseout", () => {
        if (!isActive) {
            toggleAboutContainer.style.borderTopWidth = "5px";
            toggleAboutContainer.style.borderBottomWidth = "5px";
            toggleAbout.innerHTML = hiddenAboutData.toggleOpen.outline;
        }
        else {
            toggleAboutContainer.style.borderTopWidth = "10px";
            toggleAboutContainer.style.borderBottomWidth = "10px";
            toggleAbout.innerHTML = hiddenAboutData.toggleClose.outline;
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
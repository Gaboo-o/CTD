export function initializeHeader(data) {
    /** About **/
    const aboutData = data.about;
    
    // Title
    const title = document.querySelector(".about-title");
    title.innerHTML = aboutData.title.replace("\n", "<br>");

    // Description
    const description = document.querySelector(".about-description");
    description.textContent = aboutData.description.replace("\n", "<br>");

    // Image
    const image = document.querySelector(".about-image-container img")
    image.src = aboutData.imageSrc;
    image.alt = aboutData.imageAlt;

    /** Hidden About **/
    const hiddenAboutData = data.hiddenAbout;

    // Hidden About container
    const hiddenAbout = document.querySelector(".hidden-about");

    // Details
    const details = document.querySelector(".hidden-about-content p");
    details.innerHTML = hiddenAboutData.details.replace("\n", "<br>");

    // Toggle button
    const toggleAbout = document.querySelector(".toggle-about-btn");
    toggleAbout.innerHTML = hiddenAboutData.toggleClose;

    let isActive = false;

    toggleAbout.addEventListener("click", () => {
        hiddenAbout.classList.toggle("active");
        toggleAbout.innerHTML = !isActive ? hiddenAboutData.toggleOpen : hiddenAboutData.toggleClose;

        if (!isActive) {
            smoothScrollTo(hiddenAbout);
        }

        isActive = !isActive;
    });

    // Border color
    toggleAbout.addEventListener("mouseover", () => {
        hiddenAbout.style.borderBottom = 
            !isActive 
                ? `10px solid var(--text-hover-color)` 
                : `5px solid var(--text-hover-color)`;
    });

    toggleAbout.addEventListener("mouseout", () => {
        hiddenAbout.style.borderBottom = 
            !isActive 
                ? `5px solid var(--border-color)` 
                : `10px solid var(--border-color)`;
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
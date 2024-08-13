export function initializeAbout(data) {
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
}
export function initializeFooter(data) {
    // Links
    const socialLinks = document.querySelector(".links-container");

    data.list.forEach( (item) => {
        const link = document.createElement("a");
        link.classList.add("link");
        link.href = item.href;
        link.target = "_blank";

        const linkImg = document.createElement("img");
        linkImg.classList.add("link-img");
        linkImg.src = item.src;
        linkImg.alt = item.alt;

        link.appendChild(linkImg);
        socialLinks.appendChild(link);
    });

    // Copyright
    const copyright = document.querySelector(".copyright");
    
    // Get current year
    const today = new Date();
    const thisYear = today.getFullYear();

    copyright.innerHTML = `&copy; ${thisYear} Gabriel Valle. All rights reserved.`;
}
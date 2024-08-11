export function initializeNavigation(data) {
    // Logo
    const logo = document.querySelector(".nav-list-left img");
    logo.src = data.logoSrc;
    logo.alt = data.logoAlt;

    // Menu icon
    const menuIcon = document.querySelector(".menu-toggle img");
    menuIcon.src = data.menuIconSrc;
    menuIcon.alt = data.menuIconAlt;

    // Nav items
    const navListRight = document.querySelector(".nav-list-right");
    data.navItems.forEach(item => {
        // Button
        const navButton = document.createElement("a");
        navButton.classList.add("nav-button");
        navButton.href = item.href;

        // Image
        const navListImg = document.createElement("img");
        navListImg.classList.add("nav-list-img");
        navListImg.src = item.src;
        navListImg.alt = `${item.text} Icon`;

        // Text
        const span = document.createElement("span");
        span.textContent = item.text;

        navButton.appendChild(navListImg);
        navButton.appendChild(span);
        navListRight.appendChild(navButton);
    });

    // Menu logic
    const menuToggle = document.querySelector(".menu-toggle");
    let isActive = false;

    menuToggle.addEventListener("click", () => {
        const navButtons = document.querySelectorAll(".nav-button");
        const delayMultiplier = 100;

        if (!isActive) {
            navListRight.classList.add("active");            
        }
        else {
            const totalDuration = (navButtons.length + 1) * delayMultiplier;

            setTimeout(() => {
                navListRight.classList.remove("active");
            }, totalDuration);
        }
        
        navButtons.forEach((button, index) => {
            const delay = isActive
            ? (navButtons.length - 1 - index) * delayMultiplier
            : index * delayMultiplier;
            
            setTimeout(() => {
                button.classList.toggle("active");
            }, delay);
        });

        isActive = !isActive;
    });
}

/* 

0 * 100 = 000
1 * 100 = 100
2 * 100 = 200

0 * x = 200
1 * y = 100
2 * z = 000

*/
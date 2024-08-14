import { smoothScrollTo } from "./_hiddenAbout.js";

export function initializeNavigation(data) {
    // Logo
    const logo = document.querySelector(".nav-list-left img");
    logo.src = data.logoSrc;
    logo.alt = data.logoAlt;

    // Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const menuIcon = document.querySelector(".menu-toggle img");
    menuIcon.src = data.menuIconSrc;
    menuIcon.alt = data.menuIconAlt;

    // Trigger hidden about
    const toggleAbout = document.querySelector(".toggle-about-text");

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

        navButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Smooth scroll
            const targetElement = document.querySelector(navButton.getAttribute("href"));
            if (targetElement) {
                smoothScrollTo(targetElement);
            }

            // Trigger hidden about
            if (item.text === "About") {     
                const event = new Event("open");           
                toggleAbout.dispatchEvent(event);
            }

            // Remove Menu
            menuToggle.click();
        });
    });

    // Menu logic
    let isActive = false;

    const menuToggleClick = () => {
        const navButtons = document.querySelectorAll(".nav-button");
        const delayMultiplier = 100;

        if (!isActive) {
            menuIcon.src = data.menu.open.src;
            menuIcon.alt = data.menu.open.alt;

            navListRight.classList.add("active");            
        }
        else {
            menuIcon.src = data.menu.close.src;
            menuIcon.alt = data.menu.close.alt;

            const totalDuration = (navButtons.length + 1) * delayMultiplier;

            setTimeout(() => {
                navListRight.classList.remove("active");
            }, totalDuration);
        }
        
        navButtons.forEach((button, index) => {
            const delay = 
                isActive
                    ? (navButtons.length - 1 - index) * delayMultiplier
                    : index * delayMultiplier;
            
            setTimeout(() => {
                button.classList.toggle("active");
            }, delay);
        });

        isActive = !isActive;
    };
    
    menuToggle.addEventListener("click", menuToggleClick, false);
    menuToggle.addEventListener("focus", menuToggleClick, false);   

    const menuToggleHoverOn = () => {
        if (!isActive) {
            menuIcon.src = data.menu.closeFill.src;
            menuIcon.alt = data.menu.closeFill.alt;
        }
        else {
            menuIcon.src = data.menu.openFill.src;
            menuIcon.alt = data.menu.openFill.alt;
        }
    }

    const menuToggleHoverOff = () => {
        if (!isActive) {
            menuIcon.src = data.menu.close.src;
            menuIcon.alt = data.menu.close.alt;
        }
        else {
            menuIcon.src = data.menu.open.src;
            menuIcon.alt = data.menu.open.alt;
        }
    }

    menuToggle.addEventListener("mouseover", menuToggleHoverOn, true);
    menuToggle.addEventListener("mouseout", menuToggleHoverOff, true); 
}

/* 

0 * 100 = 000
1 * 100 = 100
2 * 100 = 200

0 * x = 200
1 * y = 100
2 * z = 000

*/
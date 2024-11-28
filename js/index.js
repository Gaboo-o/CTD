import { dataFetch } from "./dataFetch.js";

import { initializeNavigation } from "./components/_navigation.js";
import { initializeAbout } from "./components/_about.js";
import { initializeHiddenAbout } from "./components/_hiddenAbout.js";
import { initializeSkills } from "./components/_skills.js"
import { initializeProjects } from "./components/_projects.js"
import { initializeFooter } from "./components/_footer.js"
import { initializeTheme } from "./components/_theme.js"

/*
*  Getting Content
*/

let content;

const loadContent = async () => {
    try {
        content = await dataFetch("./json/content.json");
    }
    catch(error) {
        console.error(error);
    }
};


/*
*  Initialization
*/

document.addEventListener("DOMContentLoaded", async () => {
    await loadContent();

    // Navigation
    initializeNavigation(content.navBar);

    // Header
    initializeAbout(content.header);
    initializeHiddenAbout(content.header);

    // Skills
    initializeSkills(content.skills);

    // Projects
    initializeProjects(content.projects);

    //Footer 
    initializeFooter(content.footer);

    // Theme
    initializeTheme();
});


/*
*  Font Resize
*/

function updateFontSize() {
    const baseFont = 16;
    const baseWidth = 1200; 
    const widthChange = 500; // Width threshold to increment/decrement font
    const sizeChange = 1; // px to increment/decrement

    // Get current width
    const currentWidth = window.innerWidth;

    // Increment/dec font by 1 for each 500 px change in width
    const newFont = baseFont + Math.floor((currentWidth - baseWidth) / widthChange) * sizeChange;

    // Set new font size
    document.documentElement.style.fontSize = `${newFont}px`;
}

updateFontSize();

window.addEventListener("resize", updateFontSize);

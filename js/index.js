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


const messageForm = document.forms["leave_message"];

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = event.target.userName.value;
    const userEmail = event.target.userEmail.value;
    const userMessage = event.target.userMessage.value;

    // console.log("Name:", userName);
    // console.log("Email:", userEmail);
    // console.log("Message:", userMessage);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");

    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <a href="mailto:${userEmail}">${userName}</a>
        <span>: ${userMessage}</span>
    `;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", () => {
        const entry = removeButton.parentNode;
        entry.remove();

        // Hide messgae when empty
        if (messageList.children.length === 0) {
            messageSection.style.display = "none";
        }
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageSection.style.display = "block";

    messageForm.reset();
});
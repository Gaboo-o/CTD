import { dataFetch } from "./dataFetch.js";
import { initializeNavigation } from "./components/_navigation.js";
import { initializeHeader } from "./components/_header.js";
import { initializeSkills } from "./components/_skills.js"
import { initializeProjects } from "./components/_projects.js"

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
    initializeHeader(content.header);

    // Skills
    initializeSkills(content.skills);

    // Projects
    initializeProjects(content.projects);
});


/*
*  Contact
*/

// Select form
const messageForm = document.forms["leave_message"];

messageForm.addEventListener("submit", (event) => {
    // Prevent page from refreshing
    event.preventDefault();

    // Get values from the form fields
    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    // Log the values to the console
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
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", () => {
        const entry = removeButton.parentNode;
        entry.remove();

        // Hide the #messages section if the list is empty
        if (messageList.children.length === 0) {
            messageSection.style.display = "none";
        }
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageSection.style.display = "block";

    // Reset form fields
    messageForm.reset();
});


/*
*  Footer
*/

// Create footer element
const footer = document.querySelector("footer");
document.body.appendChild(footer);

// Get current year
const today = new Date();
const thisYear = today.getFullYear();

// Create copyright element
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; ${thisYear} Gabriel Valle. All rights reserved.`;

// Append copyright element to footer
footer.appendChild(copyright);
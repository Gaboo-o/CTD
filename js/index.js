// Create footer element
const footer = document.querySelector("footer");
document.body.appendChild(footer);

// Get current year
const today = new Date();
const thisYear = today.getFullYear();

// Create copyright element
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; ${thisYear} Gabriel Valle. All rights reserved.`;

// Append copyright element to footer
footer.appendChild(copyright);

///////////////////////////////////////////////////////////////////////////

// List of skills
const skills = ["JavaScript", "HTML", "CSS", "C++", "Python"];

// Select skills section and list
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

// Add each skill to the list
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

/////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////

async function fetchGitHubRepos() {
    try {
        const response = await fetch("https://api.github.com/users/Gaboo-o/repos");
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        return await response.json();
    }
    catch (error) {
        console.error(error);
    }
}

function updateProjects(repos) {
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = ''; // Clear existing projects

    repos.forEach((repo, index) => { // Loop to test the layout
        if (index < 4) {
            const projectHTML = `
            <div class="project">
                <img src="${repo.owner.avatar_url}" alt="Project ${index + 1}" class="project-image">
                <div class="project-details">
                    <h2 class="project-details-title">${repo.name}</h2>
                    <p class="project-details-description">${repo.description}</p>
                    <a class="project-details-button" href="${repo.html_url}" target="_blank">View on GitHub</a>
                </div>
            </div>
            `;

            projectsContainer.insertAdjacentHTML('beforeend', projectHTML);
        }
    });
}

// Update projects only after fetching them
document.addEventListener('DOMContentLoaded', async () => {
    const repos = await fetchGitHubRepos();
    updateProjects(repos);
});
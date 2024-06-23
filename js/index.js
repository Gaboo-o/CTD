// Create footer element
const footer = document.querySelector('footer');
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

// Select skills section and unordered list
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

// Iterate over skills array and add each skill to the list
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
import { dataFetch } from "../dataFetch.js";

export async function initializeProjects(data) {
    // Title
    document.querySelector(".projects-title").innerHTML = data.title;
    const projectsContainer = document.querySelector(".projects-container");

    const projectPromises = data.list.map(async (item) => {
        const { name, imgFile } = item;

        const repoUrl = `https://api.github.com/repos/Gaboo-o/${name}`;
        
        try {
            const repo = await dataFetch(repoUrl);

            if (repo) {
                const imageUrl = `https://raw.githubusercontent.com/Gaboo-o/${name}/${imgFile}`;

                const projectHTML = `
                    <div class="project">
                        <img class="project-image" src="${imageUrl}" alt="${repo.name}">
                        <div class="project-details">
                            <h2 class="project-details-title">${repo.name}</h2>
                            <p class="project-details-description">${repo.description}</p>
                            <a class="project-details-button" href="${repo.html_url}" target="_blank">Code Source</a>
                        </div>
                    </div>
                `;

                projectsContainer.insertAdjacentHTML("beforeend", projectHTML);
            }
        } 
        catch (error) {
            console.error(error);
        }
    });

    await Promise.all(projectPromises);
}

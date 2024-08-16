function getCurrentTheme() {
    return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function setTheme(theme) {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light-mode", theme === "light");
}

export function initializeTheme() {
    const toggleCheckbox = document.querySelector(".toggle-theme");

    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);

    toggleCheckbox.checked = currentTheme === "light";

    toggleCheckbox.addEventListener("change", () => {
        const newTheme = toggleCheckbox.checked ? "light" : "dark";
        setTheme(newTheme);
    });
}
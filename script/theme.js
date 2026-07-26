const themeToggle = document.querySelector("#theme-toggle");

function currentTheme() {
  return (
    document.documentElement.dataset.theme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function applyIcon() {
  if (!themeToggle) return;
  themeToggle.innerHTML = currentTheme() === "dark" ? "&#127769;" : "&#9728;";
}

applyIcon();

themeToggle?.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  applyIcon();
});

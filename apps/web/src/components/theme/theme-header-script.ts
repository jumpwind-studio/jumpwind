export const THEME_HEADER_SCRIPT = `const d = document.documentElement;
const t = localStorage?.theme;
if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) {
  d.style.colorScheme = "dark";
  d.setAttribute("data-mode", "dark");
} else {
  d.style.colorScheme = "light";
  d.removeAttribute("data-mode");
}`;

export default THEME_HEADER_SCRIPT;

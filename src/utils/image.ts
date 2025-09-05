
const IMAGE_BASE = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

export function getFullImageUrl(path: string = "") {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  
  return `${IMAGE_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

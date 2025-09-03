
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

export function getFullMediaUrl(path: string = "") {
  if (!path) return "";
  
  if (/^(https?:)?\/\//.test(path)) return path;
  
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

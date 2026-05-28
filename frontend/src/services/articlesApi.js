const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function buildUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), options);

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function resolveMediaUrl(url) {
  if (!url || url.startsWith("http")) {
    return url;
  }

  return buildUrl(url);
}

export async function listArticlePage({ page = 1, pageSize = 6 } = {}) {
  return request(`/api/articles/?page=${page}&page_size=${pageSize}`);
}

export async function listArticles() {
  const data = await listArticlePage({ page: 1, pageSize: 6 });
  return Array.isArray(data) ? data : data.results || [];
}

export async function getArticle(id) {
  return request(`/api/articles/${id}/`);
}

export async function createArticle(articleData) {
  return request("/api/articles/", {
    method: "POST",
    body: articleData,
  });
}

export async function updateArticle(id, articleData) {
  return request(`/api/articles/${id}/`, {
    method: "PATCH",
    body: articleData,
  });
}

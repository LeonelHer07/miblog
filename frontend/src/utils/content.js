export function getTextExcerpt(content = "", maxLength = 160) {
  const withoutHtml = content
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|h1|h2|h3|li|blockquote)>/gi, " ")
    .replace(/<[^>]*>/g, " ");
  const withoutMarkdown = withoutHtml.replace(/[#*_>`[\]()~-]/g, " ");
  const normalized = withoutMarkdown.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trim()}...`;
}

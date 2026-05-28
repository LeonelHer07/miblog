import DOMPurify from "dompurify";

const allowedTags = [
  "a",
  "blockquote",
  "br",
  "code",
  "em",
  "h1",
  "h2",
  "h3",
  "hr",
  "input",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "small",
  "span",
  "strong",
  "ul",
];

const allowedAttributes = ["checked", "data-type", "disabled", "href", "style", "target", "type"];

export function sanitizeArticleHtml(content = "") {
  return DOMPurify.sanitize(content, {
    ALLOWED_ATTR: allowedAttributes,
    ALLOWED_TAGS: allowedTags,
  });
}

export function getPlainTextFromHtml(content = "") {
  const container = document.createElement("div");
  container.innerHTML = sanitizeArticleHtml(content);
  return container.textContent?.replace(/\s+/g, " ").trim() || "";
}

import { sanitizeArticleHtml } from "../../utils/html";

export default function ArticleBody({ content }) {
  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(content) }}
    />
  );
}

import { useArticles } from "../../context/useArticles"
import { Link } from "react-router-dom"
import { resolveMediaUrl } from "../../services/articlesApi";
import { getTextExcerpt } from "../../utils/content";

export default function GridLayout() {
const { articles, loading, error } = useArticles();

  if (loading) {
    return <div className="text-center mt-10">Cargando artículos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-300">{error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center mt-10">No hay artículos disponibles</div>;
  }

return (
  <div className="flex flex-col gap-6">
    {articles.slice(0, 6).map((article) => (
      <Link
        key={article.id}
        to={`/articles/${article.id}`}
        className="block"
      >
        <article className="flex flex-col gap-3">
          {article.cover_image && (
            <img
              src={resolveMediaUrl(article.cover_image)}
              alt={article.title}
              className="h-40 w-full object-cover"
            />
          )}
          <h3 className="text-base font-bold text-slate-950 dark:text-white">{article.title}</h3>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
            {getTextExcerpt(article.body, 160)}
          </p>
          {article.tags?.length > 0 && (
            <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
              {article.tags.map((tag) => tag.name).join(", ")}
            </p>
          )}
        </article>
      </Link>
    ))}
  </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle, resolveMediaUrl } from "../../services/articlesApi";
import ArticleBody from "./ArticleBody";

const notFoundMessage = "No encontramos este articulo.";

const formatDate = (date) =>
  new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadArticle() {
      setLoading(true);
      setError(null);

      try {
        const data = await getArticle(id);

        if (!ignore) {
          setArticle(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.status === 404 ? notFoundMessage : "No se pudo cargar el articulo.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <div className="py-16 text-center">Cargando articulo...</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-red-600 dark:text-red-300">{error}</p>
        <Link to="/" className="font-semibold text-violet-700 dark:text-violet-300">
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl">
      {article.cover_image && (
        <img
          src={resolveMediaUrl(article.cover_image)}
          alt={article.title}
          className="mb-8 h-72 w-full object-cover sm:h-96"
        />
      )}

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-violet-700 dark:text-violet-300">
          {article.author} · {formatDate(article.created_at)}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-3xl font-bold tracking-normal text-slate-950 dark:text-white">
            {article.title}
          </h2>
          <Link
            to={`/articles/${article.id}/edit`}
            className="inline-flex w-fit items-center justify-center bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Edit post
          </Link>
        </div>
      </div>

      <ArticleBody content={article.body} />

      {article.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-200"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

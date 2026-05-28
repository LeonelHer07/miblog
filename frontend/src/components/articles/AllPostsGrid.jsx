import { Link } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react";
import { listArticlePage, resolveMediaUrl } from "../../services/articlesApi";
import { getTextExcerpt } from "../../utils/content";

const pageSize = 6;

function PostCard({ article }) {
  return (
    <article className="flex h-full flex-col gap-3">
      {article.cover_image && (
        <img
          src={resolveMediaUrl(article.cover_image)}
          alt={article.title}
          className="h-60 w-full object-cover"
        />
      )}

      <h3 className="text-lg font-bold text-slate-950 dark:text-white">{article.title}</h3>

      <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
        {getTextExcerpt(article.body, 120)}
      </p>

      {article.tags?.length > 0 && (
        <p className="mt-auto text-xs font-medium text-violet-700 dark:text-violet-300">
          {article.tags.map((tag) => tag.name).join(", ")}
        </p>
      )}
    </article>
  );
}

function PaginationControls({ currentPage, goToPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 text-slate-600 transition hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-300 dark:hover:text-white"
      >
        Anterior
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`min-h-9 min-w-9 px-3 py-2 transition ${
              page === currentPage
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-sky-200 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 text-slate-600 transition hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-300 dark:hover:text-white"
      >
        Siguiente
      </button>
    </nav>
  );
}

export default function GridLayout() {
  const hasLoadedRef = useRef(false);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageChanging, setPageChanging] = useState(false);
  const [error, setError] = useState(null);

  const totalPages = useMemo(() => Math.max(Math.ceil(count / pageSize), 1), [count]);

  useEffect(() => {
    let ignore = false;

    async function loadPage() {
      if (hasLoadedRef.current) {
        setPageChanging(true);
      }

      try {
        const data = await listArticlePage({ page: currentPage, pageSize });

        if (!ignore) {
          setArticles(data.results || []);
          setCount(data.count || 0);
          setError(null);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError("No se pudieron cargar los articulos.");
        }
        console.error("Error cargando pagina de articulos", fetchError);
      } finally {
        if (!ignore) {
          setInitialLoading(false);
          hasLoadedRef.current = true;
          window.setTimeout(() => setPageChanging(false), 120);
        }
      }
    }

    loadPage();

    return () => {
      ignore = true;
    };
  }, [currentPage]);

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    if (nextPage === currentPage) {
      return;
    }

    const scrollPosition = window.scrollY;
    setCurrentPage(nextPage);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosition, behavior: "auto" });
    });
  };

  if (initialLoading) {
    return <div className="mt-10 text-center">Cargando artículos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-300">{error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center mt-10">No hay artículos disponibles</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">All Blog Posts</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Pagina {currentPage} de {totalPages}
          </p>
        </div>

        <PaginationControls
          currentPage={currentPage}
          goToPage={goToPage}
          totalPages={totalPages}
        />
      </div>

      <div
        className={`grid min-h-[900px] grid-cols-1 gap-x-8 gap-y-10 transition-opacity duration-300 ease-out sm:grid-cols-2 lg:min-h-[660px] lg:grid-cols-3 ${
          pageChanging ? "opacity-40" : "opacity-100"
        }`}
        aria-busy={pageChanging}
      >
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="block transition-transform duration-200 hover:-translate-y-1"
          >
            <PostCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
}

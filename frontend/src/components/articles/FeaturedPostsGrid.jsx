import { Link } from "react-router-dom";
import { useArticles } from "../../context/useArticles";
import { resolveMediaUrl } from "../../services/articlesApi";
import { getTextExcerpt } from "../../utils/content";

function Tags({ tags }) {
  if (!tags?.length) {
    return null;
  }

  return (
    <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
      {tags.map((tag) => tag.name).join(", ")}
    </p>
  );
}

function HeroPost({ article }) {
  return (
    <Link to={`/articles/${article.id}`} className="block">
      <article className="grid gap-6">
        {article.cover_image && (
          <img
            src={resolveMediaUrl(article.cover_image)}
            alt={article.title}
            className="h-[280px] w-full object-cover"
          />
        )}
        <div>
          <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-950 dark:text-white">
            {article.title}
          </h3>
          <p className="mb-6 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-200">
            {getTextExcerpt(article.body, 230)}
          </p>
          <Tags tags={article.tags} />
        </div>
      </article>
    </Link>
  );
}

function SidePost({ article }) {
  return (
    <Link to={`/articles/${article.id}`} className="block">
      <article className="grid grid-cols-1 gap-5 sm:grid-cols-[180px_1fr] lg:grid-cols-[150px_1fr]">
        {article.cover_image && (
          <img
            src={resolveMediaUrl(article.cover_image)}
            alt={article.title}
            className="h-44 w-full object-cover sm:h-full"
          />
        )}
        <div className="min-w-0">
          <h3 className="mb-3 text-xl font-bold leading-tight text-slate-950 dark:text-white">
            {article.title}
          </h3>
          <p className="mb-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
            {getTextExcerpt(article.body, 190)}
          </p>
          <Tags tags={article.tags} />
        </div>
      </article>
    </Link>
  );
}

function WidePost({ article }) {
  return (
    <Link to={`/articles/${article.id}`} className="block lg:col-span-2">
      <article className="grid gap-6 lg:grid-cols-[minmax(320px,500px)_1fr] lg:items-start">
        {article.cover_image && (
          <img
            src={resolveMediaUrl(article.cover_image)}
            alt={article.title}
            className="h-56 w-full object-cover"
          />
        )}
        <div className="min-w-0">
          <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-950 dark:text-white">
            {article.title}
          </h3>
          <p className="mb-6 text-base leading-8 text-slate-700 dark:text-slate-200">
            {getTextExcerpt(article.body, 240)}
          </p>
          <Tags tags={article.tags} />
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedPostsGrid() {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return <div className="mt-10 text-center">Cargando artículos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-300">{error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="mt-10 text-center">No hay artículos disponibles</div>;
  }

  const [hero, firstSide, secondSide, wide] = articles.slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
      {hero && <HeroPost article={hero} />}

      <div className="grid gap-8">
        {firstSide && <SidePost article={firstSide} />}
        {secondSide && <SidePost article={secondSide} />}
      </div>

      {wide && <WidePost article={wide} />}
    </div>
  );
}

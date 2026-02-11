import { useArticles } from "../../context/ArticleContext"
import { Link } from 'react-router-dom';

export default function GridLayout() {
  const { articles, loading } = useArticles(); // ✅ Usamos el context

  const Card = ({ article, imgClass }) => {
    if (!article) {
      return (
        <div className="text-white text-center flex items-center justify-center h-full">
          Sin artículo
        </div>
      );
    }

    return (
      <>
        {article.cover_image && (
          <img
            src={
              article.cover_image.startsWith("http")
                ? article.cover_image
                : `http://localhost:8000${article.cover_image}`
            }
            alt={article.title}
            className={imgClass}
          />
        )}

        <div>
          <h2 className="text-black font-bold text-lg mb-[12px] dark:text-white">{article.title}</h2>

          <p className="text-black text-sm mb-[24px] dark:text-white">
            {article.body?.substring(0, 200)}
          </p>

          {article.tags && (
            <p className="text-black text-xs mt-1 dark:text-white">
              {article.tags.map((tag) => tag.name).join(", ")}
            </p>
          )}
        </div>
      </>
    );
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando artículos...</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center mt-10">No hay artículos disponibles</div>;
  }

return (
  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 h-auto p-4">

    {/* 🔹 Artículo 1 */}
    <Link to={`/articles/${articles[0].id}`}>
      <div className="p-3 flex flex-col h-auto gap-[32px]">
        <Card article={articles[0]} imgClass="h-[228px]" />
      </div>
    </Link>

    {/* 🔹 Artículos 2 y 3 */}
    <div className="grid grid-cols-1 gap-4">
      <Link to={`/articles/${articles[1].id}`}>
        <div className="p-3 flex flex-col lg:flex-row gap-[24px]">
          <Card article={articles[1]} imgClass="w-full" />
        </div>
      </Link>

      <Link to={`/articles/${articles[2].id}`}>
        <div className="p-3 flex flex-col lg:flex-row gap-[24px]">
          <Card article={articles[2]} imgClass="w-full" />
        </div>
      </Link>
    </div>

    {/* 🔹 Artículo 4 */}
    <Link
      to={`/articles/${articles[3].id}`}
      className="lg:col-span-2 block"
    >
      <div className="p-3 flex flex-col lg:flex-row gap-[32px] mt-[30px]">
        <Card article={articles[3]} imgClass="w-full lg:w-1/2" />
      </div>
    </Link>

  </div>
);

}
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
          <h2 className="text-black font-bold text-lg mb-[12px]">{article.title}</h2>

          <p className="text-black text-sm mb-[24px]">
            {article.body?.substring(0, 200)}
          </p>

          {article.tags && (
            <p className="text-black text-xs mt-1">
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
    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen p-4">

      <Link to="/articles/">
        <div className="p-3 flex flex-col h-auto gap-[32px]">
          <Card article={articles[0]} imgClass={"h-[228px]"} />
        </div>
      </Link>
     

      {/* 🔹 Artículos 2 y 3 */}
      <div className="grid grid-rows-2 gap-4">
        <div className="p-3 flex flex-row gap-[24px]">
          <Card article={articles[1]} imgClass={"w-full"} />
        </div>
        <div className="p-3 flex flex-row gap-[24px]">
          <Card article={articles[2]} imgClass={"w-full"} />
        </div>
      </div>

      {/* 🔹 Artículo 4 ocupa fila inferior completa */}
      <div className="col-span-2 p-3 flex flex-row gap-[32px] mt-[30px]">
        <Card article={articles[3]} imgClass={"w-1/2"} />
      </div>
    </div>
  );
}

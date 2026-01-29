import { useArticles } from "../../context/ArticleContext"

export default function GridLayout() {
const { articles, loading } = useArticles();

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

        <div className="">
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

return (
    
    <div className="flex flex-col">
{/* Tomamos los primeros 6 artículos y los mapeamos */}
{articles.slice(0, 6).map((article) => (
  <div key={article.id} className="p-3 flex flex-col h-auto gap-[32px]">
    <Card
      article={article}
    />
  </div>
))}


    </div>
  );
}

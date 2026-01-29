import { useArticles } from "../../context/ArticleContext"
const Card = ({ index }) => {
  const { articles } = useArticles(); // obtienes los artículos desde el context
  const article = articles[index];    // seleccionas el artículo según el índice

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
        />
      )}

      <div>
        <h2 className="text-black font-bold text-lg mb-[12px]">{article.title}</h2>
        <div
          className="prose prose-lg text-gray-800 max-w-full text-justify"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
        {article.tags && (
          <p className="text-black text-xs mt-1">
            {article.tags.map((tag) => tag.name).join(", ")}
          </p>
        )}
      </div>
    </>
  );
};
export default Card;


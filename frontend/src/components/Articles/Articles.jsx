import { useArticles } from "../../context/ArticleContext"
import { useParams } from "react-router-dom"

const Card = () => {
  const { id } = useParams()           // obtenemos el ID desde la URL
  const { articles } = useArticles()   // obtenemos todos los artículos desde el context

  // buscamos el artículo que coincida con el ID
  const article = articles.find(a => a.id.toString() === id)

  if (!article) {
    return (
      <div className="text-white text-center flex items-center justify-center h-full">
        Sin artículo
      </div>
    )
  }

  return (
    <div className="p-3 flex flex-col h-auto gap-[32px]">
      {article.cover_image && (
        <img
          src={
            article.cover_image.startsWith("http")
              ? article.cover_image
              : `http://localhost:8000${article.cover_image}`
          }
          alt={article.title}
          className="w-full h-[228px] object-cover"
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
    </div>
  )
}

export default Card

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

export default function GridLayout() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
    const interval = setInterval(fetchArticles, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/articles/");
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.log("Error cargando artículos:", error);
      setLoading(false);
    }
  };

  const Card = ({ article }) => {
    if (!article) {
      return (
        <div className="text-black text-center flex items-center justify-center h-full">
          Sin artículo
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {article.cover_image && (
          <img
            src={
              article.cover_image.startsWith("http")
                ? article.cover_image
                : `http://localhost:8000${article.cover_image}`
            }
            alt={article.title}
            className="w-full h-[240px] object-cover"
          />
        )}

        <h2 className="text-black font-bold text-lg dark:text-white">{article.title}</h2>

        <p className="text-black text-xs mb-[24px] dark:text-white">
          {article.body?.substring(0, 120)}
        </p>

        {article.tags && (
          <p className="text-black text-[10px] dark:text-white ">
            {article.tags.map((tag) => tag.name).join(", ")}
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando artículos...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 h-screen p-4">
      {articles.slice(0, 6).map((article) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}
          className="p-3 flex flex-col h-auto gap-[32px] block"
        >
          <Card article={article} />
        </Link>
      ))}
    </div>
  );

}

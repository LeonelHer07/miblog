import { useState, useEffect } from "react";

export default function GridLayout() {
  const [articles, setArticles] = useState([]);

  // 🚀 Fetch de la API al cargar el componente
  useEffect(() => {
    fetch("http://localhost:8000/api/articles/")
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen p-0">
      {/* Elemento 1: primer artículo */}
      <div className="bg-blue-500 flex flex-col items-center justify-center p-2">
        {articles[0] ? (
          <>
            {articles[0].cover_image && (
              <img
                src={articles[0].cover_image}
                alt={articles[0].title}
                className="w-full h-32  object-cover mb-2"
              />
            )}
            <h2 className="text-white font-bold">{articles[0].title}</h2>
            <p className="text-white text-sm">
              {articles[0].body.substring(0, 100)}...
            </p>
            <p className="text-white text-xs mt-1">
              Tags: {articles[0].tags.map(tag => tag.name).join(", ")}
            </p>
          </>
        ) : (
          <p className="text-white">Cargando artículo...</p>
        )}
      </div>

      {/* Elemento 2 y 3 */}
      <div className="grid grid-rows-2 gap-4">
        <div className="bg-green-500 flex items-center justify-center">2
          <img
                src={`http://localhost:8000/media/${articles[0].cover_image}`}
                alt={articles[0].title}
                className="w-full h-32  mb-2"
              />
        </div>
        <div className="bg-yellow-500 flex items-center justify-center">3</div>
      </div>

      {/* Elemento 4 */}
      <div className="bg-red-500 col-span-2 flex items-center justify-center">4</div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { listArticles } from "../services/articlesApi";
import { ArticlesContext } from "./articlesContext";

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadArticles() {
      try {
        const data = await listArticles();

        if (!ignore) {
          setArticles(data);
          setError(null);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError("No se pudieron cargar los articulos.");
        }
        console.error("Error cargando articulos", fetchError);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadArticles();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, loading, error }}>
      {children}
    </ArticlesContext.Provider>
  );
}

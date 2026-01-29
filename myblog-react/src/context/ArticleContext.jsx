import { createContext, useContext, useEffect, useState } from "react";


const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/articles/");
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando artículos", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, loading }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  return useContext(ArticlesContext);
}

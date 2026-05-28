import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleEditor from "../components/articles/ArticleEditor";
import Nav from "../components/layout/Nav";
import { getArticle, updateArticle } from "../services/articlesApi";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadArticle() {
      try {
        const data = await getArticle(id);

        if (!ignore) {
          setArticle(data);
          setError(null);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError("No se pudo cargar el articulo para editar.");
        }
        console.error("Error cargando articulo para editar", fetchError);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      ignore = true;
    };
  }, [id]);

  const savePost = async (articleData) => {
    const updatedArticle = await updateArticle(id, articleData);
    navigate(`/articles/${updatedArticle.id}`);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-slate-950 dark:text-white sm:px-6 lg:px-8">
      <Nav />
      {loading && <div className="py-16 text-center">Cargando editor...</div>}
      {error && <div className="py-16 text-center text-red-600 dark:text-red-300">{error}</div>}
      {article && (
        <ArticleEditor
          backTo={`/articles/${article.id}`}
          initialArticle={article}
          mode="edit"
          onSubmit={savePost}
        />
      )}
    </main>
  );
}

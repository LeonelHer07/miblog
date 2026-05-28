import { useNavigate } from "react-router-dom";
import ArticleEditor from "../components/articles/ArticleEditor";
import Nav from "../components/layout/Nav";
import { createArticle } from "../services/articlesApi";

export default function NewArticle() {
  const navigate = useNavigate();

  const createPost = async (articleData) => {
    const article = await createArticle(articleData);
    navigate(`/articles/${article.id}`);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-slate-950 dark:text-white sm:px-6 lg:px-8">
      <Nav />
      <ArticleEditor mode="create" onSubmit={createPost} />
    </main>
  );
}

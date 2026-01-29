import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { ArticlesProvider } from "./context/ArticleContext";

function App() {
  return (
    <ArticlesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/" element={<Article />} />
      </Routes>
    </ArticlesProvider>
  );
}

export default App;

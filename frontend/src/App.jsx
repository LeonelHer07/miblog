import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import EditArticle from "./pages/EditArticle";
import NewArticle from "./pages/NewArticle";
import { ArticlesProvider } from "./context/ArticlesProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import ScrollToTop from "./components/layout/ScrollTop";

function App() {
  return (
    <ThemeProvider>
      <ArticlesProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/new" element={<NewArticle />} />
          <Route path="/articles/:id/edit" element={<EditArticle />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </ArticlesProvider>
    </ThemeProvider>
  );
}

export default App;

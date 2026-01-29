import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { ArticlesProvider } from "./context/ArticleContext";
import ScrollToTop from "./components/ScrollTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <ArticlesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </ArticlesProvider>
    </>
  );
}

export default App;

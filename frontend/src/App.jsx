import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { ArticlesProvider } from "./context/ArticleContext";
import { ThemeProvider } from "./context/ThemeCcontext";
import ScrollToTop from "./components/ScrollTop";

function App() {
  return (
    <>
    <div className="">
        <ThemeProvider>
        <ScrollToTop />
        <ArticlesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/:id" element={<Article />} />
          </Routes>
        </ArticlesProvider>
      </ThemeProvider>

    </div>
    

    </>
  );
}

export default App;

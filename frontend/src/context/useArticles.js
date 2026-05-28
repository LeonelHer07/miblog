import { useContext } from "react";
import { ArticlesContext } from "./articlesContext";

export function useArticles() {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error("useArticles must be used inside ArticlesProvider");
  }

  return context;
}

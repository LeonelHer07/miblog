import ArticleDetail from "../components/articles/ArticleDetail";
import RecentPostsSidebar from "../components/articles/RecentPostsSidebar";
import Nav from "../components/layout/Nav";

const Article = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-slate-950 dark:text-white sm:px-6 lg:px-8">
        <Nav />

        <div className='grid gap-8 lg:grid-cols-[320px_1fr]'>
          <aside>
              <RecentPostsSidebar/>
          </aside>

          <section className='min-w-0'>
            <ArticleDetail />
          </section>
        </div>
    </main>
  )
}

export default Article

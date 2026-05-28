import { Link } from "react-router-dom";
import Nav from "../components/layout/Nav";
import Logo from "../components/layout/Logo";
import FeaturedPostsGrid from "../components/articles/FeaturedPostsGrid";
import AllPostsGrid from "../components/articles/AllPostsGrid";

const Home = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mb-8">
        <Nav />
        <Logo />
      </div>

      <section className="border-t border-slate-300 pt-9 dark:border-slate-700">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Recent blog post</h2>
          <Link
            to="/articles/new"
            className="inline-flex w-fit items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            <span aria-hidden="true">+</span>
            Create post
          </Link>
        </div>
        <FeaturedPostsGrid />
      </section>

      <section className="mt-12 border-t border-slate-200 pt-9 dark:border-slate-800">
        <AllPostsGrid />
      </section>
    </main>
  )
}

export default Home

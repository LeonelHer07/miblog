import Nav from "./components/header/Nav"
import Logo from "./components/header/Logo"
import Recent from "./components/Recent_post/Grid_blogs"
import All from "./components/all_posts/Grid_layout"

function App() {
  

  return (
    <>
      <div className="ml-[112px] mr-[112px] mt-[30px]">
        <div className="mb-[30px]">
          <Nav />
          <Logo />
        </div>

        <div className="pt-[30px]">
          <h2 className="mb-[32px]">Recent blog post</h2>
          <Recent />
        </div>

        <div className="mt-[30px]">
          <h2 className="mb-[32px]">All Blog Posts</h2>
          <All />
        </div>


      </div>

    </>
  )
}

export default App

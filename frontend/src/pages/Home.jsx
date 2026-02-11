import Nav from "../components/header/Nav"
import Logo from "../components/header/Logo"
import Recent from "../components/Recent_post/Grid_blogs"
import All from "../components/all_posts/Grid_layout"
import React from 'react'
import { ThemeProvider } from "../context/ThemeCcontext";

const Home = () => {
  return (

    <ThemeProvider>
        <div className="">
          <div className="ml-[112px] mr-[112px] mt-[30px] dark:text-white">
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

    </div>


    </ThemeProvider>
 
  )
}

export default Home
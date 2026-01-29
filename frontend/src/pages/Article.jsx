import React from 'react'
import Nav from '../components/header/Nav'
import RecentPost from "../components/Articles/RecentPost"
import Card from "../components/Articles/Articles"



const Article = () => {
  return (
    <div className="ml-[112px] mr-[112px] mt-[30px]">
        <Nav />

        <div className='flex gap-[32px]'>
          <div className='w-[342px]'>
              <RecentPost/>
          </div>

          <div className='w-full'>
            <Card index={0}/>

          </div>
        </div>

        


    </div>
  )
}

export default Article
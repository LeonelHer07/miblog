import React from 'react'
import Moon from "../../assets/moon.svg"
import Sun from "../../assets/sun.svg"

const Nav = () => {
  return (
    <div className='flex justify-between mb-[50px]'>
        <h1>Leonel</h1>
        <nav className='flex gap-[14px]'>
            <ul className='flex gap-[14px] text-lg'>
                <a href="/"><li>blog</li></a>
                <a href="/"><li>Projects</li></a>
                <a href="/"><li>About</li></a>
                <a href="/"><li>Newsletter</li></a>
            </ul>

            <div className='flex gap-4'>
                <img src={Sun} alt="" />
                <img src={Moon} alt="" />
            </div>
        </nav>


    </div>
  )
}

export default Nav
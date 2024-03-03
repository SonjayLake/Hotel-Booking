import React from 'react'
import Header from "../components/Header.tsx";
import Hero from '../components/Hero.tsx';
import Footer from '../components/Footer.tsx';

interface Props  {
  children: React.ReactNode;
}

function Layout({children} : Props) {
  return (
      <div className="flex flex-col min h-screen">
        <Header/>
        <Hero/>
        <div className="container mx-auto py-10 flex-1">
          {children}
        </div>
        <Footer/>
      </div>


  )
}

export default Layout
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Terminal from './Terminal'
import About from './About'
import Skills from './Skills'
import Project from './Project'
import Education from './Education'
import Languages from './Languages'
import Footer from './Footer'

const Layout = () => {
  return (
    // Background color thoda dark rakha hai taaki main white card pop kare
    <div className='min-h-screen bg-[#b1b1b1] px-4 md:px-10 py-5 font-mono'>
      
      {/* Main Container with Shadow */}
      <div className='relative bg-[#fdfdfd] w-full max-w-[1400px] mx-auto border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden' >
        
        {/* Grid Background - Isse pointer-events-none rakha hai taaki buttons click ho sakein */}
        <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)'
        }}
      ></div>

        {/* Content - Isko z-10 rakha hai background ke upar */}
        <div className="relative z-10">
          <Navbar/>
          <Hero />
          <About/>
          {/* Spacing sections ke beech me barabar honi chahiye */}
          <div className="py-10"><Terminal/></div>
          <Project />
          <Skills/>
          <div className='flex flex-col lg:flex-row justify-center items-center mx-auto w-[90%] mb-15 '>
            <Education />
            <Languages />
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default Layout
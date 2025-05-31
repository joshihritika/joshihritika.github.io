import React from 'react';
export const Hero = () => {
  return <section id="home" className="pt-24 pb-16 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-5xl font-light text-stone-800 mb-6">
              <span className="block">Sustainability & Social Impact Researcher</span>
              <span className="block mt-2 text-[#4A6741]">Hritika Joshi</span>
            </h2>
            <p className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed">
              Dedicated social researcher and non-profit professional with
              expertise in qualitative research, survey design, and grant
              writing. Committed to creating meaningful social impact through
              evidence-based practices.
            </p>
            <div className="flex space-x-4">
              <a href="#contact" className="px-6 py-3 bg-[#4A6741] hover:bg-[#3A5331] text-white rounded-md transition-colors duration-300">
                Get in Touch
              </a>
              <a href="/projects" className="px-6 py-3 border border-[#2A4747] text-[#2A4747] hover:bg-[#2A4747] hover:text-white rounded-md transition-colors duration-300">
                View Projects
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-[#2A4747]/10 rounded-3xl transform rotate-6"></div>
              <img src="https://media.licdn.com/dms/image/v2/D4D03AQHewQ2YPWyovw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1683730525816?e=1751500800&v=beta&t=-PZxguB55LztBec7b6g-fc8MURNGL9Heq4CqN89HqQo" alt="Professional headshot of Hritika Joshi" className="rounded-3xl object-cover w-full h-full relative z-10 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
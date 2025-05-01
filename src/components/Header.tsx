import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-[#4A6741] rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-lg font-light">HJ</span>
          </div>
          <h1 className="text-xl text-stone-800">Hritika Joshi</h1>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-stone-600 hover:text-[#4A6741] transition-colors duration-300">
              {item}
            </a>)}
        </nav>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-stone-700" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-stone-50 border-t border-stone-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-stone-600 hover:text-[#4A6741] transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                    {item}
                  </a>)}
            </nav>
          </div>
        </div>}
    </header>;
};
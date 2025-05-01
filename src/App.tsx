import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundDecoration } from './components/BackgroundDecoration';
export function App() {
  return <div className="relative bg-stone-50 min-h-screen w-full overflow-x-hidden font-[sans-serif] font-light">
      <BackgroundDecoration />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>;
}
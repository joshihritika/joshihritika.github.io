import React from 'react';
export const About = () => {
  return <section id="about" className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            About Me
          </h2>
          <div className="prose prose-stone lg:prose-lg max-w-none">
            <p>
              I'm a research professional specializing in social inclusion, gender equality, and evidence-based policy development. With a focus on international development, I collaborate with leading organizations to drive sustainable and equitable change in diverse contexts.
            </p>
            <p>
              My expertise spans social protection systems, education evaluation, and gender-responsive policy analysis, with particular experience in South Asia. I approach each project with methodological rigor and a commitment to amplifying marginalized voices through participatory research practices.
            </p>
            <p>
              Through my work with organizations including the Asian Development Bank, UNICEF, and Save the Children, I've developed a multidisciplinary perspective that bridges theory and practice. I'm passionate about translating research findings into actionable recommendations that create meaningful impact for communities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center">
              <div className="text-lg font-medium text-stone-800 sm:mr-4">
                My Approach:
              </div>
              <div className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-900/10 border-l-4 border-indigo-900 text-stone-700 italic">
                "Research is not just about collecting data, but about centering human experiences and using evidence to advocate for more just and inclusive systems."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
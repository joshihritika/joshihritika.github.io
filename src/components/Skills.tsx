import React from 'react';
import { CodeIcon, PenToolIcon, GlobeIcon, LayersIcon } from 'lucide-react';
export const Skills = () => {
  const skills = [{
    category: 'Qualitative Research',
    icon: <CodeIcon size={24} className="text-red-700" />,
    items: ['Interviewing', 'Focus Groups', 'Case Studies', 'Content Analysis', 'Survey Design']
  }, {
    category: 'Quantitative Research',
    icon: <PenToolIcon size={24} className="text-red-700" />,
    items: ['Surveys', 'Excel', 'R', 'Data Visualization']
  }, {
    category: 'Languages',
    icon: <GlobeIcon size={24} className="text-red-700" />,
    items: ['English', 'Hindi', 'Nepali(Native)', 'Norwegian(Basic)']
  }, {
    category: 'Other Skills',
    icon: <LayersIcon size={24} className="text-red-700" />,
    items: ['Grant Writing', 'Non-Profit Management', 'Event Planning', 'Community Engagement', 'Social Media Management']
  }];
  return <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Skills
          </h2>
          <p className="text-sm text-stone-500">Skills & Tools</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {skillGroup.icon}
                <h3 className="text-lg text-stone-800 ml-2">
                  {skillGroup.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, idx) => <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-red-700/80 rounded-full mr-2"></span>
                    <span className="text-stone-600">{skill}</span>
                  </li>)}
              </ul>
            </div>)}
        </div>
      </div>
    </section>;
};
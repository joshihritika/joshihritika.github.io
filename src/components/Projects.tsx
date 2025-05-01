import React, { useState } from 'react';
import { ExternalLinkIcon, ArrowLeftIcon } from 'lucide-react';

// Define project type
interface Project {
  title: string;
  description: string;
  fullDescription?: string[];
  image: string;
  tags: string[];
  link?: string;
}

// ProjectDetail component for showing detailed project information
const ProjectDetail = ({ 
  project, 
  onBack 
}: { 
  project: Project; 
  onBack: () => void 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-stone-600 hover:text-stone-800 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" /> Back to projects
      </button>
      
      <h2 className="text-2xl text-stone-800 mb-4 font-medium">{project.title}</h2>
      <p className="text-stone-600 mb-6">{project.description}</p>
      
      {project.fullDescription && (
        <div className="mb-6">
          {project.fullDescription.map((paragraph: string, idx: number) => (
            <p key={idx} className="text-stone-600 mb-3">{paragraph}</p>
          ))}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag: string, idx: number) => (
          <span key={idx} className="px-3 py-1 bg-indigo-900/10 text-indigo-900 text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      {project.link && (
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-900 hover:text-indigo-700"
        >
          Visit Project <ExternalLinkIcon size={16} className="ml-1" />
        </a>
      )}
    </div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      title: 'Social Inclusion and Intersectionality Review',
      description: 'Research Assistant for Asian Development Bank - Analysis of Country Partnership Strategies across South Asia (2025)',
      fullDescription: [
        'Conducted comprehensive review of social inclusion and intersectionality aspects in Country Partnership Strategies and Report and Recommendations documents for South Asia Department\'s developing member countries.',
        'Analyzed policy documents to evaluate integration of social inclusion principles and provided strategic recommendations for improvement.',
        'Contributed to research methodology and data collection frameworks focused on marginalized groups and intersectional challenges.'
      ],
      image: 'https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Research', 'Policy Analysis', 'Social Inclusion', 'Asian Development Bank']
    },
    {
      title: 'GEC II STEM Program Evaluation',
      description: 'Research Consultant for Foundation for Development Management - Effectiveness Evaluation in Nepal (2024)',
      fullDescription: [
        'Led the effectiveness evaluation of the Girls Education Challenge II STEM program implementation in Nepal.',
        'Designed and implemented mixed-methods research protocols to assess program outcomes and impact.',
        'Analyzed educational outcomes and provided evidence-based recommendations for program optimization.'
      ],
      image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'STEM', 'Program Evaluation', 'Nepal']
    },
    {
      title: 'Child Marriage and Social Protection',
      description: 'Research Assistant for STAAR Facility - Roadmap for Social Protection to Tackle Child Marriage in Nepal (2024)',
      fullDescription: [
        'Developed a comprehensive roadmap for leveraging social protection systems to reduce child marriage rates in Nepal.',
        'Conducted literature review and stakeholder interviews to identify best practices and implementation gaps.',
        'Contributed to policy recommendations that align with Nepal\'s socio-economic context and institutional frameworks.'
      ],
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Child Protection', 'Social Policy', 'Research', 'Nepal']
    },
    {
      title: 'Gender Equality and Social Inclusion Training Manual',
      description: 'Literature Review Support for ICIMOD Quinquennial Review (2024)',
      fullDescription: [
        'Supported the development of a comprehensive Gender Equality and Social Inclusion (GESI) training manual for The International Centre for Integrated Mountain Development.',
        'Conducted extensive literature review on GESI principles and best practices in mountain development contexts.',
        'Contributed to instructional design and content development for various training modules focusing on inclusion strategies.'
      ],
      image: 'https://images.unsplash.com/photo-1526750635936-ee3e908c36cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Gender Equality', 'Training Development', 'Mountain Development', 'ICIMOD']
    },
    {
      title: 'Gender Equality and Social Inclusion Diagnostic',
      description: 'Research Assistant for Asian Development Bank - GESI Diagnostic of Selected Sectors in Nepal (2024)',
      fullDescription: [
        'Conducted sector-specific gender equality and social inclusion diagnostics across key development sectors in Nepal.',
        'Analyzed institutional frameworks, policies, and implementation practices through a GESI lens.',
        'Developed evidence-based recommendations to enhance GESI integration in ADB operations and country-level interventions.'
      ],
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Gender Analysis', 'Sector Diagnostics', 'Nepal', 'Asian Development Bank']
    },
    {
      title: 'We Deserve Better: Social Protection for Women and Girls',
      description: 'Field Research Assistant for UNICEF - Survey Implementation (2024)',
      fullDescription: [
        'Supported the design and implementation of a comprehensive survey examining social protection systems and their effectiveness for women and girls.',
        'Conducted field interviews and focus group discussions with diverse stakeholders including beneficiaries and service providers.',
        'Contributed to data analysis and insight generation to strengthen gender-responsive social protection programs.'
      ],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Social Protection', 'UNICEF', 'Field Research', 'Gender']
    },
    {
      title: 'Synergy',
      description: 'Personal Blog exploring the intersection of development, technology, and culture (2024)',
      fullDescription: [
        'Created and maintained a personal blog focusing on the synergies between international development, technology innovation, and cultural contexts.',
        'Published articles on topics including digital inclusion, human-centered design, and evidence-based policymaking.',
        'Fostered meaningful discussions through community engagement and collaborative content creation.'
      ],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Blog', 'International Development', 'Technology', 'Culture'],
      link: 'https://synergy-blog.com'
    },
    {
      title: 'Safe Schools Common Approach Evidence Synthesis',
      description: 'Data Analysis & Evaluation Consultant for Save the Children (2022/2023)',
      fullDescription: [
        'Led the synthesis and analysis of evidence related to Save the Children\'s Safe Schools Common Approach implementation across multiple countries.',
        'Developed evaluation frameworks and methodologies to assess program effectiveness and impact.',
        'Produced actionable insights and recommendations to strengthen school safety initiatives and child protection systems.'
      ],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'Child Protection', 'Program Evaluation', 'Save the Children']
    }
  ];

  // If a project is selected, show its detail page
  if (selectedProject !== null) {
    return (
      <section id="projects" className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <ProjectDetail 
            project={projects[selectedProject]} 
            onBack={() => setSelectedProject(null)} 
          />
        </div>
      </section>
    );
  }

  // Otherwise show the projects grid
  return (
    <section id="projects" className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Projects
          </h2>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="p-6">
                <h3 className="text-xl text-stone-800 mb-2">{project.title}</h3>
                <p className="text-stone-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-900/10 text-indigo-900 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(index)} 
                  className="text-indigo-900 hover:text-indigo-700 flex items-center text-sm mt-2"
                >
                  View Details <ExternalLinkIcon size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
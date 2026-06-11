import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiMaximize2 } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';
import ProjectModal from '../ui/ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      _id: '1',
      title: 'Smart Employee Management System',
      description: 'Developed a web-based ASP.NET MVC application to manage employees and workflow tasks efficiently. Features: Employee CRUD, Task Assignment, Tracking, Auth, Analytics Dashboard.',
      techStack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Entity Framework', 'Bootstrap'],
      image: 'https://placehold.co/600x400/1e293b/3b82f6?text=Employee+Management',
      github: '#',
      liveDemo: '#',
      featured: true
    },
    {
      _id: '2',
      title: 'E-Commerce Platform',
      description: 'Developed a complete e-commerce web application. Features: User Authentication, Product Management, Shopping Cart, Order Tracking, Search Functionality, Admin Dashboard.',
      techStack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Entity Framework', 'Bootstrap'],
      image: 'https://placehold.co/600x400/1e293b/3b82f6?text=E-Commerce+Platform',
      github: '#',
      liveDemo: '#',
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="A selection of my recent work, side projects, and open-source contributions."
        />

        {projects.length === 0 ? (
          <div className="text-center py-20 text-dark-500">
            No projects available at the moment.
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, idx) => (
              <motion.div 
                key={project._id} 
                variants={itemVariants}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 flex flex-col h-full"
              >
                {/* Image Container with Hover Effect */}
                <div className="relative aspect-video overflow-hidden bg-dark-200 dark:bg-dark-800">
                  <img
                    src={project.image || (project.images && project.images[0])}
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                    >
                      <FiMaximize2 /> View Details
                    </button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-dark-600 dark:text-dark-300 mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-200 text-xs font-semibold rounded-md border border-dark-200 dark:border-dark-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2.5 py-1 bg-dark-100 dark:bg-dark-800 text-xs font-semibold rounded-md">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-dark-100 dark:border-dark-800">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-dark-600 hover:text-primary-500 transition-colors"
                        >
                          <FiGithub /> Code
                        </a>
                      )}
                      {project.liveDemo && (
                        <a 
                          href={project.liveDemo} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-dark-600 hover:text-primary-500 transition-colors"
                        >
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;

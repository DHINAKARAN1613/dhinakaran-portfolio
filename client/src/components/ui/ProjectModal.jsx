import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!project) return null;

  const mediaItems = project.media?.length > 0 
    ? project.media 
    : (project.images?.length > 0 ? project.images.map(url => ({ url, type: 'image' })) : [{ url: project.image, type: 'image' }]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="bg-white dark:bg-dark-900 w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-dark-200 dark:border-dark-700">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-dark-100 dark:border-dark-800">
                <h3 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                  {project.title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                >
                  <FiX className="w-6 h-6 text-dark-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Media Gallery */}
                  <div className="space-y-4">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-dark-100 dark:bg-dark-800 relative">
                      {mediaItems[activeImage]?.type === 'video' ? (
                        <video 
                          src={mediaItems[activeImage].url} 
                          controls 
                          autoPlay 
                          className="w-full h-full object-contain bg-black"
                        />
                      ) : (
                        <img 
                          src={mediaItems[activeImage]?.url} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {mediaItems.length > 1 && (
                      <div className="flex gap-4 overflow-x-auto pb-2">
                        {mediaItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                              activeImage === idx ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            {item.type === 'video' ? (
                              <div className="w-full h-full bg-dark-800 flex items-center justify-center text-white text-xs font-bold">
                                VIDEO
                              </div>
                            ) : (
                              <img src={item.url} alt="Thumbnail" className="w-full h-full object-cover" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">About the Project</h4>
                      <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 btn-outline"
                        >
                          <FiGithub /> Source Code
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 btn-primary"
                        >
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

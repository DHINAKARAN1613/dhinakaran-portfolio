import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiChevronDown } from 'react-icons/fi';
import resume from './resume.pdf';
const Hero = () => {
  const greeting = "Hello, I'm";
  const name = "DHINAKARAN M";
  const rolesSequence = ["Aspiring .NET Developer", 2000, "Full Stack Developer", 2000, "Backend Engineer", 2000];
  const description = "Passionate .NET Developer skilled in ASP.NET MVC, ASP.NET Core, C#, SQL Server, Entity Framework, ADO.NET, and modern frontend technologies. Focused on building scalable web applications with clean UI and robust backend architecture.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />

      {/* Particle Overlay (Simple CSS implementation) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold tracking-wide text-sm backdrop-blur-md">
            👋 {greeting}
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="text-gradient block mb-2">{name}</span>
            <span className="text-3xl md:text-5xl text-dark-600 dark:text-dark-300">
              I'm a{' '}
              <TypeAnimation
                sequence={rolesSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-dark-800 dark:text-white"
              />
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-dark-600 dark:text-dark-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#projects" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 text-lg shadow-xl shadow-primary-500/25 group">
              View Projects
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={resume} download="Dhinakaran_Resume.pdf" target="_blank" rel="noreferrer" className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 text-lg group">
              <FiDownload className="transform group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 text-lg group">
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
            <a href="https://github.com/dhinakaran" target="_blank" rel="noreferrer" className="text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors transform hover:scale-110">
              <FiGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/dhina1316/" target="_blank" rel="noreferrer" className="text-dark-500 hover:text-primary-500 dark:text-dark-400 dark:hover:text-primary-400 transition-colors transform hover:scale-110">
              <FiLinkedin size={24} />
            </a>
          </motion.div>

        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 2 }
        }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors cursor-pointer z-20"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
        <FiChevronDown className="w-6 h-6" />
      </motion.div>

    </section>
  );
};

export default Hero;

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiBookOpen } from 'react-icons/fi';
import SectionTitle from '../ui/SectionTitle';

const timelineData = [
  {
    year: '2026',
    type: 'work', // using work icon for certification
    title: '.NET Full Stack Development',
    subtitle: 'SLA Institute',
    description: 'Comprehensive certification program covering C#, ASP.NET Core MVC, Entity Framework, SQL Server, and modern frontend technologies.',
  },
  {
    year: '2024 - Present',
    type: 'education',
    title: 'MCA - Computer Applications',
    subtitle: 'Sri Muthukumaran Institute of Technology, Mangadu',
    description: 'Pursuing Master of Computer Applications. Focusing on advanced software engineering, backend architecture, and database management.',
  },
  {
    year: '2021 - 2024',
    type: 'education',
    title: 'BCA - Computer Applications',
    subtitle: 'Government Arts and Science College, Thiruvottiyur',
    description: 'Completed Bachelor of Computer Applications with a CGPA/Percentage of 78%. Built a strong foundation in programming logic, algorithms, and web development.',
  },
];

const TimelineCard = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex justify-between w-full mb-12 items-center">
      
      {/* Timeline Path (Center Line) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500/20 to-accent-500/20 hidden md:block" />
      
      {/* Icon directly on the line */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-[20px] md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-4 border-white dark:border-dark-950 flex items-center justify-center text-white z-10 shadow-xl"
      >
        {item.type === 'work' ? <FiBriefcase size={16} /> : <FiBookOpen size={16} />}
      </motion.div>

      {/* Card Content Desktop Left / Mobile Right */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className={`w-full md:w-5/12 ml-[60px] md:ml-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
      >
        <div className={`glass-card p-6 relative group hover:border-primary-500/50 transition-colors`}>
          {/* Arrow pointing to timeline */}
          <div className={`hidden md:block absolute top-5 w-4 h-4 bg-white dark:bg-dark-800 border-t border-r border-white/30 dark:border-dark-700/30 transform ${isEven ? 'right-[-8px] rotate-45' : 'left-[-8px] -rotate-[135deg]'}`} />
          
          <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold mb-3">
            {item.year}
          </span>
          <h3 className="text-xl font-bold mb-1">{item.title}</h3>
          <h4 className="text-dark-500 dark:text-dark-400 font-medium mb-3 text-sm flex items-center gap-2">
            {item.subtitle}
          </h4>
          <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" className="section-padding">
      <div className="container mx-auto max-w-5xl relative">
        <SectionTitle 
          title="Education & Experience" 
          subtitle="My professional journey and academic background."
        />

        <div className="relative mt-16 pt-6">
          {/* Main vertical line for mobile */}
          <div className="absolute left-[39px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500/20 to-accent-500/20 md:hidden" />
          
          {timelineData.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

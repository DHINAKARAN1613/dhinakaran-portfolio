import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';

const SkillBar = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className={`font-semibold ${skill.color}`}>{skill.name}</span>
        <span className="text-sm font-bold text-dark-500 dark:text-dark-400">{skill.level}%</span>
      </div>
      <div className="w-full h-3 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden border border-dark-200 dark:border-dark-700/50">
        <motion.div
          ref={ref}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full rounded-full bg-current ${skill.color}`}
          style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)' }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "HTML5 & CSS3", level: 90, color: "text-blue-500" },
        { name: "JavaScript", level: 85, color: "text-yellow-500" },
        { name: "Bootstrap & Tailwind CSS", level: 85, color: "text-teal-500" },
        { name: "Angular", level: 75, color: "text-red-500" },
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "C#", level: 85, color: "text-purple-500" },
        { name: "ASP.NET MVC & Core", level: 80, color: "text-blue-600" },
        { name: "Entity Framework & LINQ", level: 80, color: "text-emerald-500" },
        { name: "ADO.NET", level: 75, color: "text-indigo-500" },
      ]
    },
    {
      title: "Database & Tools",
      skills: [
        { name: "SQL Server", level: 85, color: "text-red-600" },
        { name: "Git & GitHub", level: 90, color: "text-gray-500" },
        { name: "IIS & Vercel", level: 75, color: "text-sky-500" },
        { name: "Postman", level: 85, color: "text-orange-500" },
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", level: 95, color: "text-green-500" },
        { name: "Logical Thinking", level: 90, color: "text-blue-400" },
        { name: "Team Collaboration", level: 90, color: "text-purple-400" },
        { name: "Quick Learner & Debugging", level: 95, color: "text-yellow-600" },
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <SectionTitle 
          title="Technical Expertise" 
          subtitle="A comprehensive overview of my technical skills and proficiency levels."
        />

        {skillCategories.length === 0 ? (
          <div className="text-center py-20 text-dark-500">
            No skill categories available.
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12"
          >
            {skillCategories.map((category, catIdx) => (
              <motion.div 
                key={catIdx}
                variants={itemVariants}
                className="glass-card p-8 group hover:border-primary-500/50 transition-colors duration-500"
              >
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center text-sm">
                    {catIdx + 1}
                  </span>
                  {category.title}
                </h3>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIdx) => (
                    <SkillBar key={skillIdx} skill={skill} index={skillIdx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;

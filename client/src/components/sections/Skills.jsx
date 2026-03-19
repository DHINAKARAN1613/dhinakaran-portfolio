import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import Skeleton from '../ui/Skeleton';
import api from '../../utils/api';

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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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

  if (loading || !profile) {
    return (
      <section id="skills" className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle title="Technical Expertise" subtitle="Loading skills configuration..." />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  const skillCategories = profile.skillCategories || [];

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

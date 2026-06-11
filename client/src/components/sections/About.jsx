import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import SectionTitle from '../ui/SectionTitle';

const StatCard = ({ label, value, suffix }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="glass-card p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
        {inView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : '0'}
      </div>
      <p className="text-dark-600 dark:text-dark-400 font-medium uppercase tracking-wider text-sm">
        {label}
      </p>
    </div>
  );
};

const About = () => {
  const title = "My Journey";
  const paragraphs = [
    "I am an aspiring .NET Developer with strong knowledge of C#, ASP.NET MVC, ASP.NET Core, SQL Server, Entity Framework, ADO.NET, HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, and Angular.",
    "I enjoy developing responsive web applications, solving real-world problems, and continuously learning modern technologies."
  ];
  const stats = [
    { label: 'Projects Completed', value: 10, suffix: '+' },
    { label: 'Technologies', value: 15, suffix: '+' },
    { label: 'Lines of Code', value: 50, suffix: 'k+' },
    { label: 'Hours Coding', value: 1000, suffix: '+' }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="section-padding bg-dark-50 dark:bg-dark-900/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know me and what drives my passion for technology."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center mt-12"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <motion.h3 variants={itemVariants} className="text-3xl font-display font-bold">
              {title}
            </motion.h3>
            
            <div className="space-y-4 text-dark-600 dark:text-dark-300 leading-relaxed text-lg">
              {paragraphs.map((para, idx) => (
                <motion.p key={idx} variants={itemVariants}>
                  {para}
                </motion.p>
              ))}
            </div>
            
            <motion.div variants={itemVariants} className="pt-4">
              <a href="#contact" className="inline-block text-primary-500 font-bold hover:text-primary-600 transition-colors uppercase tracking-wider text-sm">
                Get in touch →
              </a>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 relative">
            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-3xl -z-10" />
            
            {stats.map((stat, idx) => (
              <StatCard 
                key={idx} 
                label={stat.label} 
                value={stat.value} 
                suffix={stat.suffix} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import defaultLogo from '../../assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#timeline' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const localProfile = localStorage.getItem('portfolio_profile');
    if (localProfile) {
      setProfile(JSON.parse(localProfile));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    if (!isHome) return; // Let default routing handle it if not on home
    
    const id = href.replace('/#', '');
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className={`mx-auto rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg dark:shadow-dark-900/50' : 'bg-transparent'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={profile?.logoImage || defaultLogo} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
            <span className="font-display font-bold text-xl hidden sm:block">
              {profile?.name ? profile.name.replace('.', '') : 'Dhinakaran M'}<span className="text-primary-500">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-dark-800/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 dark:border-dark-700/30">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2 text-sm font-medium rounded-full hover:bg-white dark:hover:bg-dark-700 hover:shadow-sm hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href={profile?.githubUrl || "https://github.com/DHINAKARAN1613"} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors hidden sm:block"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a 
              href={profile?.linkedinUrl || "https://www.linkedin.com/in/dhina1316/"} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors hidden sm:block"
            >
              <FiLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </a>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5 text-dark-600" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 p-4 glass-strong rounded-2xl shadow-xl border border-white/20"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-4 py-3 text-center font-medium rounded-xl hover:bg-primary-50 dark:hover:bg-dark-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                <a href={profile?.githubUrl || "https://github.com/DHINAKARAN1613"} target="_blank" rel="noreferrer" className="p-3 bg-dark-100 dark:bg-dark-800 rounded-full">
                  <FiGithub className="w-5 h-5" />
                </a>
                <a href={profile?.linkedinUrl || "https://www.linkedin.com/in/dhina1316/"} target="_blank" rel="noreferrer" className="p-3 bg-dark-100 dark:bg-dark-800 rounded-full">
                  <FiLinkedin className="w-5 h-5 text-blue-600" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

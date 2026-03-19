import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-50 dark:bg-dark-900 border-t border-dark-200 dark:border-dark-800 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 group">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold shadow-md">
              D
            </div>
            <span className="font-display font-medium text-lg">
              Dhinakaran M
            </span>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/dhinakaran" target="_blank" rel="noreferrer" className="p-2 text-dark-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-dark-800 rounded-full transition-all">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/dhina1316/" target="_blank" rel="noreferrer" className="p-2 text-dark-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-dark-800 rounded-full transition-all">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/dhina_einstein_offl?igsh=MTE0eDloY2diZGx6Yw==" target="_blank" rel="noreferrer" className="p-2 text-dark-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-dark-800 rounded-full transition-all">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="mailto:dhinakaranmani2@gmail.com" className="p-2 text-dark-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-dark-800 rounded-full transition-all">
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-200 dark:border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dark-500">
          <p>© {year} Dhinakaran M. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-primary-500 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

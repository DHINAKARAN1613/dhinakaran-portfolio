import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import SectionTitle from '../ui/SectionTitle';
import api from '../../utils/api';

const ContactInfo = ({ icon: Icon, title, content }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-dark-600 dark:text-dark-300">{content}</p>
    </div>
  </div>
);

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Web3Forms Integration
      // Replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '6134cfe7-e365-4a39-b13c-a0e04d7d8d1c',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully! I will get back to you soon.');
        
        // Also save to local storage so it shows up in the Admin Dashboard!
        const localMessages = localStorage.getItem('portfolio_messages');
        const messages = localMessages ? JSON.parse(localMessages) : [];
        messages.push({
          _id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          createdAt: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('portfolio_messages', JSON.stringify(messages));

        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Make sure you added your Web3Forms Access Key in Contact.jsx!');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-dark-50 dark:bg-dark-900/50 relative">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Have a project in mind or want to collaborate? Feel free to reach out to me."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
          
          {/* Contact Information */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Let's talk about everything!</h3>
              <p className="text-dark-600 dark:text-dark-300 mb-8">
                Don't like forms? Send me an email. 👋
              </p>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={FiMail} 
                  title="Email" 
                  content="dhinakaranmani2@gmail.com" 
                />
                <ContactInfo 
                  icon={FiPhone} 
                  title="Phone" 
                  content="+91 9500335254" 
                />
                <ContactInfo 
                  icon={FiMapPin} 
                  title="Location" 
                  content="Chennai, Tamil Nadu, India" 
                />
              </div>
            </div>

            <div className="p-6 glass-card border-none bg-gradient-to-br from-primary-500/10 to-accent-500/10">
              <p className="font-medium text-lg mb-2">Open for opportunities</p>
              <p className="text-dark-600 dark:text-dark-300 text-sm">
                I am currently looking for new full-time opportunities. If you have a matching profile, I'd love to hear from you.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-3xl space-y-6 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 pl-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-dark-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 pl-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-dark-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 pl-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-dark-400"
                  placeholder="Hello!"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 pl-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-dark-400 resize-none w-full"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold transition-all ${
                  loading 
                    ? 'bg-primary-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

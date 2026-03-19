import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiFolder, FiMessageSquare, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiUser } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import ProfileTab from '../components/admin/ProfileTab';

const Dashboard = () => {
  const { logout, admin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'projects' | 'messages'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Project Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', longDescription: '', image: '', techStack: '', github: '', liveDemo: '', featured: false
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data } = await api.get('/projects');
        setProjects(data);
      } else {
        const { data } = await api.get('/contacts');
        setMessages(data);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // --- Project Handlers ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.techStack.split(',').map(t => t.trim()).filter(Boolean);
    const payload = { ...formData, techStack: techArray };

    try {
      if (isEditing) {
        await api.put(`/projects/${currentProject._id}`, payload);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created successfully');
      }
      resetForm();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || '',
      image: project.image || (project.images ? project.images[0] : ''),
      techStack: project.techStack.join(', '),
      github: project.github || '',
      liveDemo: project.liveDemo || '',
      featured: project.featured,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchData();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProject(null);
    setFormData({ title: '', description: '', longDescription: '', image: '', techStack: '', github: '', liveDemo: '', featured: false });
  };

  // --- Message Handlers ---
  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/contacts/${id}/read`);
      fetchData();
      toast.success('Message marked as read');
    } catch {
      toast.error('Failed to update message');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      fetchData();
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-dark-100 dark:border-dark-800 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display">Admin Dashboard</h1>
            <p className="text-dark-500 text-sm mt-1">Logged in as {admin?.email}</p>
          </div>
          <button 
            onClick={logout}
            className="mt-4 md:mt-0 px-4 py-2 flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors font-medium"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all ${
              activeTab === 'profile' 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-white dark:bg-dark-900 text-dark-600 hover:bg-primary-50 dark:hover:bg-dark-800'
            }`}
          >
            <FiUser className="inline" /> Profile & Skills
          </button>
          <button
            onClick={() => { setActiveTab('projects'); resetForm(); }}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all ${
              activeTab === 'projects' 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-white dark:bg-dark-900 text-dark-600 hover:bg-primary-50 dark:hover:bg-dark-800'
            }`}
          >
            <FiFolder /> Projects
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all ${
              activeTab === 'messages' 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-white dark:bg-dark-900 text-dark-600 hover:bg-primary-50 dark:hover:bg-dark-800'
            }`}
          >
            <FiMessageSquare /> Messages
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-sm border border-dark-100 dark:border-dark-800 p-6 md:p-8 min-h-[500px]">
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <ProfileTab key="profile-tab" />
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {isEditing || formData.title !== '' ? (
                    // PROJECT FORM
                    <div className="max-w-3xl mx-auto">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
                        <button onClick={resetForm} className="btn-outline py-1.5 px-3 text-sm flex items-center gap-1">
                          <FiX /> Cancel
                        </button>
                      </div>
                      <form onSubmit={handleProjectSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Title *</label>
                            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Short Description *</label>
                          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows="2" className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Long Description</label>
                          <textarea value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})} rows="4" className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700"></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Tech Stack (comma separated) *</label>
                          <input type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} required className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700" placeholder="React, Node, MongoDB" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">GitHub URL</label>
                            <input type="url" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Live Demo URL</label>
                            <input type="url" value={formData.liveDemo} onChange={e => setFormData({...formData, liveDemo: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded" />
                          <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                        </div>
                        <button type="submit" className="btn-primary w-full mt-4">
                          {isEditing ? 'Update Project' : 'Save Project'}
                        </button>
                      </form>
                    </div>
                  ) : (
                    // PROJECTS LIST
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Manage Projects</h2>
                        <button 
                          onClick={() => setFormData({ title: '', description: '', longDescription: '', image: '', techStack: '', github: '', liveDemo: '', featured: false })}
                          className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
                        >
                          <FiPlus /> Add New
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-dark-200 dark:border-dark-700 text-dark-500 uppercase text-xs font-bold bg-dark-50 dark:bg-dark-800/50">
                              <th className="p-4 rounded-tl-xl w-16">Image</th>
                              <th className="p-4">Title</th>
                              <th className="p-4">Tech</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 rounded-tr-xl text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map(project => (
                              <tr key={project._id} className="border-b border-dark-100 dark:border-dark-800/50 hover:bg-dark-50 dark:hover:bg-dark-800/30 transition-colors">
                                <td className="p-4">
                                  <div className="w-12 h-12 rounded bg-dark-200 dark:bg-dark-700 overflow-hidden">
                                    {(project.image || (project.images && project.images[0])) && (
                                      <img src={project.image || project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                                    )}
                                  </div>
                                </td>
                                <td className="p-4 font-medium">{project.title}</td>
                                <td className="p-4 text-sm text-dark-500">
                                  <div className="flex gap-1 flex-wrap">
                                    {project.techStack.slice(0, 3).map((t, i) => (
                                      <span key={i} className="px-2 py-0.5 bg-dark-100 dark:bg-dark-800 rounded text-xs">{t}</span>
                                    ))}
                                    {project.techStack.length > 3 && <span className="px-2 py-0.5 bg-dark-100 dark:bg-dark-800 rounded text-xs">+{project.techStack.length - 3}</span>}
                                  </div>
                                </td>
                                <td className="p-4">
                                  {project.featured ? (
                                    <span className="px-2 py-1 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold rounded-full">Featured</span>
                                  ) : (
                                    <span className="text-dark-400 text-xs font-bold">Standard</span>
                                  )}
                                </td>
                                <td className="p-4 text-right">
                                  <button onClick={() => handleEdit(project)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg mr-2 transition-colors">
                                    <FiEdit2 size={18} />
                                  </button>
                                  <button onClick={() => handleDelete(project._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                    <FiTrash2 size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {projects.length === 0 && (
                              <tr>
                                <td colSpan="5" className="p-8 text-center text-dark-500">No projects found. Create your first one!</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === 'messages' && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-xl font-bold mb-6">Contact Messages</h2>
                  
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div key={msg._id} className={`p-6 rounded-xl border ${msg.read ? 'bg-dark-50/50 dark:bg-dark-800/30 border-dark-100 dark:border-dark-800' : 'bg-white dark:bg-dark-900 border-primary-200 dark:border-primary-900/50 shadow-md'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-lg">{msg.name}</h3>
                              {!msg.read && <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>}
                            </div>
                            <a href={`mailto:${msg.email}`} className="text-sm text-primary-500 hover:underline">{msg.email}</a>
                          </div>
                          <span className="text-xs text-dark-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="mb-4">
                          <p className="font-semibold text-sm mb-1 uppercase tracking-wider text-dark-500">Subject: {msg.subject}</p>
                          <p className="text-dark-700 dark:text-dark-300 bg-dark-50 dark:bg-dark-800/50 p-4 rounded-lg whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        
                        <div className="flex gap-3 justify-end border-t border-dark-100 dark:border-dark-800 pt-4 mt-4">
                          {!msg.read && (
                            <button onClick={() => handleMarkRead(msg._id)} className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 px-3 py-1.5 rounded-lg transition-colors">
                              <FiCheck /> Mark Read
                            </button>
                          )}
                          <button onClick={() => handleDeleteMessage(msg._id)} className="flex items-center gap-2 text-sm text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors">
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <div className="text-center py-12 text-dark-500 bg-dark-50 dark:bg-dark-800/30 rounded-xl border border-dark-100 dark:border-dark-800">
                        No messages yet! You're all caught up.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

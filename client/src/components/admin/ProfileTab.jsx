import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const defaultProfile = {
    greeting: 'Hello, I\'m',
    name: 'Dhinakaran M.',
    roles: ['Aspiring .NET Developer', 'Full Stack Developer', 'Backend Engineer'],
    heroDescription: 'Passionate .NET Developer skilled in ASP.NET MVC, ASP.NET Core, C#, SQL Server, Entity Framework, ADO.NET, and modern frontend technologies.',
    aboutTitle: 'About Me',
    aboutParagraphs: [
      'I am an aspiring .NET Developer with a strong foundation in building scalable and efficient web applications.',
      'I enjoy developing clean, maintainable code and solving complex problems using modern technologies.'
    ],
    stats: [
      { label: 'Projects Completed', value: 10, suffix: '+' },
      { label: 'Months Experience', value: 6, suffix: '+' }
    ],
    skillCategories: [
      {
        title: "Frontend Development",
        skills: [
          { name: "HTML5 & CSS3", level: 90, color: "text-blue-500" },
          { name: "JavaScript", level: 85, color: "text-yellow-500" }
        ]
      },
      {
        title: "Backend Development",
        skills: [
          { name: "C#", level: 85, color: "text-purple-500" },
          { name: "ASP.NET Core", level: 80, color: "text-blue-600" }
        ]
      }
    ]
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Simulate network delay for realistic UI feeling
      await new Promise(resolve => setTimeout(resolve, 600));
      const localProfile = localStorage.getItem('portfolio_profile');
      if (localProfile) {
        setProfile(JSON.parse(localProfile));
      } else {
        setProfile(defaultProfile);
        localStorage.setItem('portfolio_profile', JSON.stringify(defaultProfile));
      }
    } catch (error) {
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem('portfolio_profile', JSON.stringify(profile));
      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // --- Helpers for simple arrays (strings) ---
  const handleStringArrayChange = (field, index, value) => {
    const newArr = [...profile[field]];
    newArr[index] = value;
    setProfile({ ...profile, [field]: newArr });
  };
  const addStringArrayItem = (field) => {
    setProfile({ ...profile, [field]: [...profile[field], ''] });
  };
  const removeStringArrayItem = (field, index) => {
    const newArr = profile[field].filter((_, i) => i !== index);
    setProfile({ ...profile, [field]: newArr });
  };

  // --- Helpers for complex arrays (objects) ---
  const addStat = () => {
    setProfile({
      ...profile,
      stats: [...profile.stats, { label: '', value: 0, suffix: '' }]
    });
  };
  const updateStat = (index, field, value) => {
    const newStats = [...profile.stats];
    newStats[index][field] = value;
    setProfile({ ...profile, stats: newStats });
  };
  const removeStat = (index) => {
    const newStats = profile.stats.filter((_, i) => i !== index);
    setProfile({ ...profile, stats: newStats });
  };

  const addCategory = () => {
    setProfile({
      ...profile,
      skillCategories: [...profile.skillCategories, { title: '', skills: [] }]
    });
  };
  const updateCategoryTitle = (index, value) => {
    const newCats = [...profile.skillCategories];
    newCats[index].title = value;
    setProfile({ ...profile, skillCategories: newCats });
  };
  const removeCategory = (index) => {
    const newCats = profile.skillCategories.filter((_, i) => i !== index);
    setProfile({ ...profile, skillCategories: newCats });
  };

  const addSkill = (catIndex) => {
    const newCats = [...profile.skillCategories];
    newCats[catIndex].skills.push({ name: '', level: 50, color: 'text-primary-500' });
    setProfile({ ...profile, skillCategories: newCats });
  };
  const updateSkill = (catIndex, skillIndex, field, value) => {
    const newCats = [...profile.skillCategories];
    newCats[catIndex].skills[skillIndex][field] = value;
    setProfile({ ...profile, skillCategories: newCats });
  };
  const removeSkill = (catIndex, skillIndex) => {
    const newCats = [...profile.skillCategories];
    newCats[catIndex].skills = newCats[catIndex].skills.filter((_, i) => i !== skillIndex);
    setProfile({ ...profile, skillCategories: newCats });
  };

  if (loading || !profile) {
    return <div className="p-8 text-center text-dark-500">Loading Profile Data...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <form onSubmit={handleSave} className="space-y-10 max-w-4xl mx-auto pb-12">
        
        {/* HERO SECTION */}
        <section className="bg-dark-50 dark:bg-dark-800/50 p-6 rounded-2xl border border-dark-100 dark:border-dark-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-500">
            Hero Section Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Greeting Text</label>
              <input type="text" value={profile.greeting || ''} onChange={(e) => setProfile({...profile, greeting: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input type="text" value={profile.name || ''} onChange={(e) => setProfile({...profile, name: e.target.value})} required className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hero Description</label>
            <textarea value={profile.heroDescription || ''} onChange={(e) => setProfile({...profile, heroDescription: e.target.value})} rows="3" className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700"></textarea>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Typing Roles</label>
              <button type="button" onClick={() => addStringArrayItem('roles')} className="text-xs flex items-center gap-1 text-primary-500 hover:text-primary-600"><FiPlus /> Add Role</button>
            </div>
            {profile.roles?.map((role, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input type="text" value={role} onChange={(e) => handleStringArrayChange('roles', idx, e.target.value)} className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700" placeholder="e.g. MERN Stack Developer" />
                <button type="button" onClick={() => removeStringArrayItem('roles', idx)} className="px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><FiTrash2 /></button>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="bg-dark-50 dark:bg-dark-800/50 p-6 rounded-2xl border border-dark-100 dark:border-dark-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-500">
            About Me Section
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">About Title</label>
            <input type="text" value={profile.aboutTitle || ''} onChange={(e) => setProfile({...profile, aboutTitle: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700" />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">About Paragraphs</label>
              <button type="button" onClick={() => addStringArrayItem('aboutParagraphs')} className="text-xs flex items-center gap-1 text-primary-500 hover:text-primary-600"><FiPlus /> Add Paragraph</button>
            </div>
            {profile.aboutParagraphs?.map((para, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <textarea value={para} onChange={(e) => handleStringArrayChange('aboutParagraphs', idx, e.target.value)} rows="3" className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-700"></textarea>
                <button type="button" onClick={() => removeStringArrayItem('aboutParagraphs', idx)} className="px-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><FiTrash2 /></button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Number Counters (Stats)</label>
              <button type="button" onClick={addStat} className="text-xs flex items-center gap-1 text-primary-500 hover:text-primary-600"><FiPlus /> Add Stat</button>
            </div>
            {profile.stats?.map((stat, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center bg-white dark:bg-dark-900 p-2 rounded-lg border border-dark-200 dark:border-dark-700">
                <input type="text" value={stat.label} onChange={(e) => updateStat(idx, 'label', e.target.value)} className="w-1/3 px-3 py-1.5 bg-transparent outline-none border-r border-dark-200 dark:border-dark-700" placeholder="Label (e.g. Experience)" />
                <input type="number" value={stat.value} onChange={(e) => updateStat(idx, 'value', Number(e.target.value))} className="w-1/4 px-3 py-1.5 bg-transparent outline-none border-r border-dark-200 dark:border-dark-700" placeholder="Value (e.g. 5)" />
                <input type="text" value={stat.suffix} onChange={(e) => updateStat(idx, 'suffix', e.target.value)} className="w-1/4 px-3 py-1.5 bg-transparent outline-none" placeholder="Suffix (e.g. +)" />
                <button type="button" onClick={() => removeStat(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg ml-auto"><FiTrash2 /></button>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="bg-dark-50 dark:bg-dark-800/50 p-6 rounded-2xl border border-dark-100 dark:border-dark-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary-500">Skills & Tech Stack</h2>
            <button type="button" onClick={addCategory} className="btn-primary py-1.5 px-3 text-sm flex items-center gap-1"><FiPlus /> Add Category</button>
          </div>
          
          <div className="space-y-6">
            {profile.skillCategories?.map((cat, catIdx) => (
              <div key={catIdx} className="bg-white dark:bg-dark-900 p-4 rounded-xl border border-dark-200 dark:border-dark-700 shadow-sm">
                <div className="flex gap-4 mb-4 items-center">
                  <input type="text" value={cat.title} onChange={(e) => updateCategoryTitle(catIdx, e.target.value)} placeholder="Category Title (e.g. Frontend)" className="flex-1 px-4 py-2 font-bold text-lg bg-transparent border-b-2 border-dark-100 focus:border-primary-500 outline-none transition-colors" />
                  <button type="button" onClick={() => removeCategory(catIdx)} className="text-red-500 text-sm px-3 py-1.5 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20">Remove Category</button>
                </div>

                <div className="space-y-2 mb-3">
                  {cat.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="flex gap-2 items-center bg-dark-50 dark:bg-dark-800 p-2 rounded-lg">
                      <input type="text" value={skill.name} onChange={(e) => updateSkill(catIdx, skillIdx, 'name', e.target.value)} placeholder="Skill Name" className="flex-1 px-3 py-1.5 bg-white dark:bg-dark-900 rounded outline-none" />
                      <input type="number" min="0" max="100" value={skill.level} onChange={(e) => updateSkill(catIdx, skillIdx, 'level', Number(e.target.value))} placeholder="%" className="w-20 px-3 py-1.5 bg-white dark:bg-dark-900 rounded outline-none" />
                      <input type="text" value={skill.color} onChange={(e) => updateSkill(catIdx, skillIdx, 'color', e.target.value)} placeholder="Tailwind Color (e.g. text-blue-500)" className="w-1/3 px-3 py-1.5 bg-white dark:bg-dark-900 rounded outline-none text-sm" />
                      <button type="button" onClick={() => removeSkill(catIdx, skillIdx)} className="p-1.5 text-red-500 hover:bg-white rounded"><FiTrash2 /></button>
                    </div>
                  ))}
                </div>
                
                <button type="button" onClick={() => addSkill(catIdx)} className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-1 ml-1"><FiPlus /> Add Skill to Category</button>
              </div>
            ))}
            {profile.skillCategories?.length === 0 && (
              <p className="text-dark-400 text-center py-4">No skill categories added yet.</p>
            )}
          </div>
        </section>

        {/* Global Save */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-t border-dark-200 dark:border-dark-800 p-4 flex justify-center z-50">
          <div className="container max-w-4xl flex justify-end">
             <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 px-8 shadow-xl shadow-primary-500/20">
              {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave />}
              Save All Profile Changes
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileTab;

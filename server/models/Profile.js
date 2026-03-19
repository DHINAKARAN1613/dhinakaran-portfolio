const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  color: { type: String, required: true },
});

const skillCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  skills: [skillSchema],
});

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
});

const profileSchema = new mongoose.Schema({
  // Hero Section
  greeting: { type: String, default: "Hello, I'm" },
  name: { type: String, required: true, default: 'Dhinakaran M' },
  roles: [{ type: String }],
  heroDescription: { type: String, default: '' },
  
  // About Section
  aboutTitle: { type: String, default: 'My Journey' },
  aboutParagraphs: [{ type: String }],
  stats: [statSchema],
  
  // Skills Section
  skillCategories: [skillCategorySchema],
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

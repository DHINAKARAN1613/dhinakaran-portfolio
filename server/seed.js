require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const Profile = require('./models/Profile');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Seed admin user
    const existingAdmin = await Admin.findOne({ email: 'admin@dhinakaran.dev' });
    if (!existingAdmin) {
      await Admin.create({
        email: 'admin@dhinakaran.dev',
        password: 'Admin@123',
      });
      console.log('✅ Admin user created: admin@dhinakaran.dev / Admin@123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Seed profile data
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create({
        greeting: "Hello, I'm",
        name: "Dhinakaran M",
        roles: ["MERN Stack Developer", "Open Source Enthusiast", "UI/UX Designer"],
        heroDescription: "I build exceptional and accessible digital experiences for the web. Specialized in building modern, performant, and scaleable applications.",
        aboutTitle: "My Journey",
        aboutParagraphs: [
          "I'm a passionate full-stack developer with a strong foundation in modern web technologies. I specialize in building robust, scalable applications using the MERN stack.",
          "My journey in tech started with a curiosity about how things work on the internet, which quickly evolved into a deep-seated passion for software engineering.",
          "When I'm not coding, you can find me exploring new open-source projects or contributing to the developer community."
        ],
        stats: [
          { label: "Years Experience", value: 3, suffix: "+" },
          { label: "Projects Completed", value: 50, suffix: "+" },
          { label: "Happy Clients", value: 20, suffix: "+" },
          { label: "Cups of Coffee", value: 1000, suffix: "+" }
        ],
        skillCategories: [
          {
            title: "Frontend Development",
            skills: [
              { name: "React / Next.js", level: 90, color: "text-blue-500" },
              { name: "JavaScript / TypeScript", level: 85, color: "text-yellow-400" },
              { name: "Tailwind CSS", level: 95, color: "text-teal-400" },
              { name: "Framer Motion", level: 80, color: "text-purple-500" }
            ]
          },
          {
            title: "Backend Development",
            skills: [
              { name: "Node.js / Express", level: 85, color: "text-green-500" },
              { name: "MongoDB", level: 80, color: "text-green-600" },
              { name: "REST APIs", level: 90, color: "text-indigo-400" },
              { name: "Authentication", level: 85, color: "text-red-400" }
            ]
          }
        ]
      });
      console.log('✅ Default Profile seeded');
    } else {
      console.log('ℹ️  Profile already exists');
    }

    // Seed sample projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'E-Commerce Platform',
          description: 'A full-featured e-commerce platform with cart, checkout, payment gateway integration, and admin dashboard for product management.',
          longDescription: 'Built a comprehensive e-commerce solution featuring user authentication, product catalog with search and filters, shopping cart, Stripe payment integration, order tracking, and a complete admin panel for inventory management. Implemented responsive design with optimized performance for mobile users.',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
          images: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
          ],
          techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
          github: 'https://github.com/dhinakaran',
          liveDemo: 'https://example.com',
          featured: true,
          order: 1,
        },
        {
          title: 'Real-Time Chat Application',
          description: 'A real-time messaging app with private/group chats, typing indicators, read receipts, and file sharing capabilities.',
          longDescription: 'Developed a real-time chat application using Socket.io for instant messaging. Features include one-on-one and group chats, typing indicators, message read receipts, file/image sharing, online status tracking, and push notifications. The app supports media previews and message search.',
          image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
          images: [
            'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
            'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80',
          ],
          techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
          github: 'https://github.com/dhinakaran',
          liveDemo: 'https://example.com',
          featured: true,
          order: 2,
        },
        {
          title: 'Task Management Dashboard',
          description: 'A Kanban-style project management tool with drag-and-drop, team collaboration, and analytics dashboard.',
          longDescription: 'Created a project management application inspired by Trello and Jira. Features drag-and-drop task boards, sprint planning, team member assignment, deadline tracking, progress analytics with charts, activity feed, and email notifications for task updates.',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
          images: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
          ],
          techStack: ['React', 'Tailwind CSS', 'Express', 'MongoDB'],
          github: 'https://github.com/dhinakaran',
          liveDemo: 'https://example.com',
          featured: true,
          order: 3,
        },
        {
          title: 'Weather Forecast App',
          description: 'A beautiful weather application with 7-day forecasts, interactive maps, and location-based weather alerts.',
          longDescription: 'Built a weather forecast application that provides current conditions, hourly and 7-day forecasts using the OpenWeatherMap API. Features include interactive weather maps, location search with autocomplete, weather alerts, UV index tracking, and air quality information with beautiful animated weather icons.',
          image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
          images: [
            'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
          ],
          techStack: ['React', 'REST API', 'Tailwind CSS'],
          github: 'https://github.com/dhinakaran',
          liveDemo: 'https://example.com',
          featured: false,
          order: 4,
        },
      ]);
      console.log('✅ Sample projects seeded');
    } else {
      console.log('ℹ️  Projects already exist');
    }

    console.log('🎉 Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedData();

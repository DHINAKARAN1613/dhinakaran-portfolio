const Profile = require('../models/Profile');

// GET /api/profile (public)
exports.getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Return empty default if none exists
      return res.json({});
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// PUT /api/profile (admin protected)
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    
    // Create one if it doesn't exist
    if (!profile) {
      profile = await Profile.create(req.body);
      return res.status(201).json(profile);
    }
    
    // Update existing
    profile = await Profile.findByIdAndUpdate(
      profile._id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

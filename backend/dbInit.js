const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function initializeDefaultSuperadmin() {
  try {
    const existingSuperadmin = await User.findOne({ role: 'superadmin' });
    if (!existingSuperadmin) {
      const hashedPassword = await bcrypt.hash('password', 10); 
      const superadmin = new User({
        email: 'admin@tutor.com',
        password: hashedPassword,
        role: 'superadmin'
      });
      await superadmin.save();
      console.log('Default superadmin created successfully');
    } else {
      console.log('Superadmin already exists');
    }
  } catch (error) {
    console.error('Error initializing default superadmin:', error);
  }
}

module.exports = initializeDefaultSuperadmin;

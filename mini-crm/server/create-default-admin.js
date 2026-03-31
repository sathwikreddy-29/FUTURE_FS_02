const sequelize = require('./config/database');
const Admin = require('./models/Admin');

async function createDefaultAdmin() {
  try {
    console.log('\n🔐 Creating default admin user...\n');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { email: 'admin@example.com' } });
    
    if (existingAdmin) {
      console.log('✅ Default admin already exists!');
      console.log('   Email: admin@example.com');
      console.log('   Password: admin123\n');
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      email: 'admin@example.com',
      password: 'admin123' // Will be hashed by beforeCreate hook
    });

    console.log('✅ Default admin created successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createDefaultAdmin();

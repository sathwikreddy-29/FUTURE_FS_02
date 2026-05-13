const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Admin = require('./models/Admin');

dotenv.config();

const [,, email, password] = process.argv;

if (!email || !password) {
  console.error('Usage: node create-admin.js <email> <password>');
  process.exit(1);
}

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    await sequelize.sync();
    console.log('✅ Database synchronized');

    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      console.log(`⚠️ Admin already exists with email ${email}`);
      process.exit(0);
    }

    const admin = await Admin.create({ email, password });
    console.log(`✅ Created admin: ${admin.email}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
}

createAdmin();

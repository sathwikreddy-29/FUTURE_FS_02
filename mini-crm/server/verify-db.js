const sequelize = require('./config/database');
const Admin = require('./models/Admin');
const Lead = require('./models/Lead');

async function verifyDatabase() {
  try {
    console.log('\n🔍 DATABASE VERIFICATION STARTED...\n');

    // Test connection
    await sequelize.authenticate();
    console.log('✅ SQLite Database connected successfully');

    // Sync models to create tables
    await sequelize.sync();
    console.log('✅ Database tables synchronized');

    // Get table info
    const tables = await sequelize.queryInterface.showAllTables();
    console.log('\n📊 Tables in Database:');
    console.log(JSON.stringify(tables, null, 2));

    // Describe Admin table
    console.log('\n📋 ADMINS Table Structure:');
    const adminColumns = await sequelize.queryInterface.describeTable('admins');
    console.log(JSON.stringify(adminColumns, null, 2));

    // Describe Lead table
    console.log('\n📋 LEADS Table Structure:');
    const leadColumns = await sequelize.queryInterface.describeTable('leads');
    console.log(JSON.stringify(leadColumns, null, 2));

    // Count records
    const adminCount = await Admin.count();
    const leadCount = await Lead.count();
    console.log('\n📈 Record Counts:');
    console.log(`   Admins: ${adminCount}`);
    console.log(`   Leads: ${leadCount}`);

    console.log('\n✅ DATABASE VERIFICATION COMPLETE!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error);
    process.exit(1);
  }
}

verifyDatabase();

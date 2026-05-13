const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sourceDb = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    logging: false,
  }
);

const targetDb = new Sequelize(
  process.env.NEW_DB_NAME,
  process.env.NEW_DB_USER,
  process.env.NEW_DB_PASSWORD,
  {
    host: process.env.NEW_DB_HOST,
    dialect: process.env.NEW_DB_DIALECT || 'mysql',
    port: process.env.NEW_DB_PORT ? Number(process.env.NEW_DB_PORT) : 3306,
    logging: false,
  }
);

function defineAdmin(sequelize) {
  return sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'admins'
  });
}

function defineLead(sequelize) {
  return sequelize.define('Lead', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    source: {
      type: DataTypes.ENUM('Website', 'LinkedIn', 'Referral', 'Other'),
      defaultValue: 'Website'
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'converted'),
      defaultValue: 'new'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'leads'
  });
}

const SourceAdmin = defineAdmin(sourceDb);
const SourceLead = defineLead(sourceDb);
const TargetAdmin = defineAdmin(targetDb);
const TargetLead = defineLead(targetDb);

async function migrate() {
  try {
    console.log('🔄 Starting database migration...');

    await sourceDb.authenticate();
    console.log('✅ Connected to source database');

    await targetDb.authenticate();
    console.log('✅ Connected to target database');

    await targetDb.sync();
    console.log('✅ Target tables synced');

    const sourceAdminCount = await SourceAdmin.count();
    const sourceLeadCount = await SourceLead.count();

    console.log(`📦 Source counts: admins=${sourceAdminCount}, leads=${sourceLeadCount}`);

    const targetAdminCount = await TargetAdmin.count();
    const targetLeadCount = await TargetLead.count();

    if ((targetAdminCount + targetLeadCount) > 0 && process.env.MIGRATE_CLEAR_TARGET !== 'true') {
      throw new Error(
        'Target database already contains data. Set MIGRATE_CLEAR_TARGET=true to overwrite target tables.'
      );
    }

    if (process.env.MIGRATE_CLEAR_TARGET === 'true') {
      await TargetAdmin.destroy({ where: {} });
      await TargetLead.destroy({ where: {} });
      console.log('✅ Cleared target tables');
    }

    const admins = await SourceAdmin.findAll({ raw: true });
    const leads = await SourceLead.findAll({ raw: true });

    if (admins.length > 0) {
      await TargetAdmin.bulkCreate(admins.map(a => ({
        email: a.email,
        password: a.password,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      })));
      console.log(`✅ Migrated ${admins.length} admin records`);
    }

    if (leads.length > 0) {
      await TargetLead.bulkCreate(leads.map(l => ({
        name: l.name,
        email: l.email,
        phone: l.phone,
        source: l.source,
        status: l.status,
        notes: l.notes,
        createdAt: l.createdAt,
        updatedAt: l.updatedAt
      })));
      console.log(`✅ Migrated ${leads.length} lead records`);
    }

    console.log('🎉 Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await sourceDb.close().catch(() => {});
    await targetDb.close().catch(() => {});
  }
}

migrate();

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Lead model
const Lead = sequelize.define('Lead', {
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

module.exports = Lead;
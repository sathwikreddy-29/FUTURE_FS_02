require('dotenv').config();
const sequelize = require('./config/database');
const Lead = require('./models/Lead');

const sampleLeads = [
  {
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1-234-567-8901',
    source: 'Website',
    status: 'new',
    notes: 'Inquired about enterprise plan'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1-345-678-9012',
    source: 'LinkedIn',
    status: 'contacted',
    notes: 'Sent proposal on 3/28. Follow up on 4/5. Interested in demo.'
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@innovative.io',
    phone: '+1-456-789-0123',
    source: 'Referral',
    status: 'contacted',
    notes: 'Referred by David Park. Schedule demo for next week.'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@business.net',
    phone: '+1-567-890-1234',
    source: 'Website',
    status: 'converted',
    notes: 'Contract signed on 3/25. Onboarding started. Setup date: 4/10'
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@manufacturing.com',
    phone: '+1-678-901-2345',
    source: 'Other',
    status: 'new',
    notes: ''
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@financeplus.com',
    phone: '+1-789-012-3456',
    source: 'LinkedIn',
    status: 'converted',
    notes: 'Premium plan payment received. Active customer since 3/20'
  },
  {
    name: 'James Martinez',
    email: 'james.martinez@startup.co',
    phone: '+1-890-123-4567',
    source: 'Website',
    status: 'contacted',
    notes: 'Qualification call scheduled for 4/2. Budget: $5000-10000'
  },
  {
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@ecommerce.shop',
    phone: '+1-901-234-5678',
    source: 'Referral',
    status: 'new',
    notes: 'Referred by Lisa Anderson. Cold contact pending.'
  },
  {
    name: 'Christopher Lee',
    email: 'chris.lee@consulting.group',
    phone: '+1-012-345-6789',
    source: 'Website',
    status: 'converted',
    notes: 'Contract signed. Implementation team assigned. Go-live: 4/15'
  },
  {
    name: 'Amanda Brown',
    email: 'amanda.brown@healthcare.org',
    phone: '+1-123-456-7890',
    source: 'LinkedIn',
    status: 'contacted',
    notes: 'Awaiting approval from CFO. Follow up next week.'
  }
];

async function seedLeads() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync();
    console.log('✅ Tables synced');

    // Clear existing leads
    await Lead.destroy({ where: {} });
    console.log('✅ Cleared existing leads');

    // Insert sample leads
    await Lead.bulkCreate(sampleLeads);
    console.log(`✅ Successfully created ${sampleLeads.length} sample leads!`);

    // Display summary
    const leads = await Lead.findAll();
    console.log('\n📊 Lead Summary:');
    console.log(`Total Leads: ${leads.length}`);
    console.log(`New: ${leads.filter(l => l.status === 'new').length}`);
    console.log(`Contacted: ${leads.filter(l => l.status === 'contacted').length}`);
    console.log(`Converted: ${leads.filter(l => l.status === 'converted').length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding leads:', error);
    process.exit(1);
  }
}

seedLeads();

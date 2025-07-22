const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crm')
  .then(() => console.log('Seeding DB...'))
  .catch(err => console.error(err));

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  notes: String
});

const LeadSchema = new mongoose.Schema({
  name: String,
  status: String,
  contactDate: String
});

const CompanySchema = new mongoose.Schema({
  name: String,
  industry: String,
  size: Number
});

const Customer = mongoose.model('Customer', CustomerSchema);
const Lead = mongoose.model('Lead', LeadSchema);
const Company = mongoose.model('Company', CompanySchema);

async function seed() {
  await Customer.deleteMany();
  await Lead.deleteMany();
  await Company.deleteMany();

  await Customer.insertMany([
    { name: "John Smith", email: "john@abc.com", phone: "555-1234", company: "ABC Corp", notes: "Interested in premium plan" },
    { name: "Sarah Johnson", email: "sarah@xyz.com", phone: "555-5678", company: "XYZ Ltd", notes: "Follow-up next week" }
  ]);

  await Lead.insertMany([
    { name: "Mike Ross", status: "New", contactDate: "2025-07-18" },
    { name: "Emma Davis", status: "Contacted", contactDate: "2025-07-15" }
  ]);

  await Company.insertMany([
    { name: "ABC Corp", industry: "Software", size: 120 },
    { name: "XYZ Ltd", industry: "Finance", size: 80 }
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
}

seed();

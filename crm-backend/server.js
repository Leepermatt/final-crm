const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Define Schemas
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

// Models
const Customer = mongoose.model('Customer', CustomerSchema);
const Lead = mongoose.model('Lead', LeadSchema);
const Company = mongoose.model('Company', CompanySchema);

// Routes
app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

app.get('/leads', async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

app.post('/leads', async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

app.get('/companies', async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

app.post('/companies', async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.json(company);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

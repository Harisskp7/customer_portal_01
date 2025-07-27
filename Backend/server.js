// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const xml2js = require('xml2js');
const https = require('https');

// Import route files
const customerLoginRoute = require('./customerLoginRoute');
const customerProfileRoute = require('./customerProfileRoute');
const customerInquiryRoute = require('./customerInquiryRoute');
const customerSalesdeliveryRoute = require('./customerSalesdeliveryRoute');
const customerSalesorderRoute = require('./customerSalesorderRoute');
const customerInvoiceRoute = require('./customerInvoiceRoute');
const customerMemoRoute = require('./customerMemoRoute');
const customerPayRoute = require('./customerAgingRoute');
const customerFormRoute = require('./customerFormRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Route mounting
app.use('/api/customer/login', customerLoginRoute);  // if you move login to route file
app.use('/api/customer/profile', customerProfileRoute);
app.use('/api/customer/inquiry', customerInquiryRoute);
app.use('/api/customer/salesdelivery', customerSalesdeliveryRoute);
app.use('/api/customer/salesorder', customerSalesorderRoute);
app.use('/api/customer/inv', customerInvoiceRoute);
app.use('/api/customer/memo', customerMemoRoute);
app.use('/api/customer/pay', customerPayRoute);
app.use('/api/customer/form', customerFormRoute);


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const router = express.Router();

// SAP Endpoint & Credentials
const SAP_URL = 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcp_ovreall_sd?sap-client=100';
const SAP_AUTH = {
  username: 'K901577',
  password: 'Haris@0713'
};

// SOAP Request Helper
async function sapPost(xmlBody) {
  try {
    const { data } = await axios.post(SAP_URL, xmlBody, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'urn:sap-com:document:sap:rfc:functions'
      },
      auth: SAP_AUTH
    });
    return data;
  } catch (error) {
    throw new Error(`SAP Post Failed: ${error.message}`);
  }
}

// Sales Order Fetch Route
router.post('/', async (req, res) => {
  const { CUSTOMER_ID } = req.body;

  if (!CUSTOMER_ID) {
    return res.status(400).json({ success: false, message: 'Missing CUSTOMER_ID' });
  }

  const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZCP_OVERALLSALES577_FM>
          <IV_KUNNR>${CUSTOMER_ID}</IV_KUNNR>
        </urn:ZCP_OVERALLSALES577_FM>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await sapPost(soapBody);

    xml2js.parseString(response, { explicitArray: false }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'XML Parsing Error', error: err });
      }

      try {
        const body = result['soapenv:Envelope']?.['soapenv:Body'] ||
                     result['soap-env:Envelope']?.['soap-env:Body'];

        const salesRes = Object.values(body)[0]; // <ZCP_SALESORDER577_FM.Response>
        const items = salesRes?.ET_SALES_SUMMARY?.item;

        if (!items) {
          return res.status(404).json({ success: false, message: 'No sales orders found' });
        }

        const list = Array.isArray(items) ? items : [items];

        const mappedOverallSaless = list.map(order => ({
          TOTAL_COUNT: order.TOTAL_COUNT,
          TOTAL_AMOUNT: order.TOTAL_AMOUNT,
          CURRENCY: order.CURRENCY
        }));

        res.json({
          success: true,
          data: mappedOverallSaless
        });
      } catch (e) {
        res.status(500).json({ message: 'Unexpected SAP response', error: e.message });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Sales Order request failed', error: err.message });
  }
});

module.exports = router;


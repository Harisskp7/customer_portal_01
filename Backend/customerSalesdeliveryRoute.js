const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const router = express.Router();

const SAP_URL = 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcp_salesdelivery_sd?sap-client=100';
const SAP_AUTH = {
  username: 'K901577',
  password: 'Haris@0713'
};

// SOAP POST Helper
async function sapPost(xmlBody) {
  try {
    const { data } = await axios.post(SAP_URL, xmlBody, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'urn:sap-com:document:sap:rfc:functions:ZCP_DELIVERY577_FM'
      },
      auth: SAP_AUTH
    });
    return data;
  } catch (error) {
    throw new Error(`SAP Post Failed: ${error.message}`);
  }
}

// Deliveries fetch route
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
        <urn:ZCP_SALESDELIVERY577_FM>
          <IV_CUSTOMER_ID>${CUSTOMER_ID}</IV_CUSTOMER_ID>
        </urn:ZCP_SALESDELIVERY577_FM>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await sapPost(soapBody);

    xml2js.parseString(response, { explicitArray: false }, (err, result) => {
      if (err) return res.status(500).json({ message: 'XML Parsing Error', error: err });

      try {
        const body = result['soapenv:Envelope']?.['soapenv:Body'] ||
                     result['soap-env:Envelope']?.['soap-env:Body'];

        const deliveryRes = Object.values(body)[0]; // <ZCP_DELIVERY577_FM.Response>

        const items = deliveryRes?.ET_DELIVERIES?.item;

        if (!items) {
          return res.status(404).json({ success: false, message: 'No deliveries found' });
        }

        const list = Array.isArray(items) ? items : [items];

        const mappedDeliveries = list.map(del => ({
          VBELN: del.VBELN,
          ERDAT: del.ERDAT,
          MATNR: del.MATNR,
          ARKTX: del.ARKTX,
          LFIMG: del.LFIMG,
          MEINS: del.MEINS,
          WAERK: del.WAERK
        }));

        res.json({
          success: true,
          data: mappedDeliveries
        });
      } catch (e) {
        res.status(500).json({ message: 'Unexpected SAP response', error: e.message });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Delivery request failed', error: err.message });
  }
});

module.exports = router;

const axios = require('axios');
const express = require('express');
const router = express.Router();

//Post Method
router.post('/generate', async (req, res) => {
        
    const gstin = req.body.gstin;
    const fileToUpload = req.body.fileToUpload;
    const docType = req.body.docType;

    if (gstin == '29AAFCD5862R000') {
        owner_id = 'e5e78c59-a3c6-4d59-8255-5c0816c11445';
    } else if(gstin == '27AAFCD5862R013') {
        owner_id = 'd0e857c3-e6b0-4871-9ffd-9e4799aa7ed4';
    } else if(gstin == '35AAFCD5862R010') {
        owner_id = 'bd40fae5-4ae3-4c08-ae67-34527078ab37';   
    } else if(gstin == '37AAFCD5862R011') {
        owner_id = '89636b28-0ea8-4a09-ab32-fb75e86ffca4';   
    } else if(gstin == '07AAFCD5862R007') {
        owner_id = '2baa84f5-16af-45ba-9c91-d7635fb27e15';   
    } else if(gstin == '33AAFCD5862R009') {
        owner_id = '5b6c59e8-69dc-43be-940f-bf634e5065db';   
    } else if(gstin == '24AAFCD5862R005') {
        owner_id = 'c4dd4cd5-822f-4d80-8b93-4989cddd3726';   
    } else if(gstin == '09AAFCD5862R006') {
        owner_id = 'b3ab7a33-2123-4dc1-83ad-542b04239c97';   
    } else if(gstin == '13AAFCD5862R008') {
        owner_id = '62ea8872-a025-4c68-9887-ecc1d8834465';   
    } else if(gstin == '05AAFCD5862R012') {
        owner_id = '4e2fa82c-7646-4ea3-99bf-e3ea7e20a158';   
    } else {
        res.send('Select Correct Seller GSTIN');
    }

    if (docType == 'Einvoice') {
        reqMethod = 'put'
        reqUrl = 'https://einvoicing.internal.cleartax.co/v2/eInvoice/generate';
        reqData = fileToUpload
    } else if(docType == 'Ewaybill') {
        reqMethod = 'put'
        reqUrl = 'https://einvoicing.internal.cleartax.co/v3/ewaybill/generate';
        reqData = fileToUpload
    } else if(docType == 'B2c') {
        reqMethod = 'post'
        reqUrl = 'https://einvoicing.internal.cleartax.co/v1/b2c/generate-qr-code';
        reqData = fileToUpload
    } else {
        res.send('Send Valid Document');
    }

    const config = {
        method: reqMethod,
        url: reqUrl,
        headers: { 
            'x-cleartax-auth-token': ' 1.450f0b99-ea85-491f-b7ca-c30bd6f071d5_8dd03598d1174854767eccf030a229435a563c2f5165e29d4c44cdf306ba7796', 
            'x-cleartax-product': ' EInvoice', 
            'Content-Type': ' application/json',
            'owner_id': owner_id, 
            'gstin': gstin
        },
        data : reqData
    };

    axios(config)
    .then(function (response) {
        res.status(200).json(response.data);
    })
    .catch(function (error) {
        res.status(400).json({ message: error.message });
    })

})

router.post('/print', async (req, res) => {
        
    const gstin = req.body.gstin;
    const format = 'PDF';
    const irn = req.body.irn;
    const invTemplate = '62cfd0a9-d1ed-47b0-b260-fe21f57e9c5e';
    const docType = req.body.docType;
    const transId = req.body.transId;
    const ewbData = req.body.ewbData;

    if (gstin == '29AAFCD5862R000') {
        owner_id = 'e5e78c59-a3c6-4d59-8255-5c0816c11445';
    } else if(gstin == '27AAFCD5862R013') {
        owner_id = 'd0e857c3-e6b0-4871-9ffd-9e4799aa7ed4';
    } else if(gstin == '35AAFCD5862R010') {
        owner_id = 'bd40fae5-4ae3-4c08-ae67-34527078ab37';   
    } else if(gstin == '37AAFCD5862R011') {
        owner_id = '89636b28-0ea8-4a09-ab32-fb75e86ffca4';   
    } else if(gstin == '07AAFCD5862R007') {
        owner_id = '2baa84f5-16af-45ba-9c91-d7635fb27e15';   
    } else if(gstin == '33AAFCD5862R009') {
        owner_id = '5b6c59e8-69dc-43be-940f-bf634e5065db';   
    } else if(gstin == '24AAFCD5862R005') {
        owner_id = 'c4dd4cd5-822f-4d80-8b93-4989cddd3726';   
    } else if(gstin == '09AAFCD5862R006') {
        owner_id = 'b3ab7a33-2123-4dc1-83ad-542b04239c97';   
    } else if(gstin == '13AAFCD5862R008') {
        owner_id = '62ea8872-a025-4c68-9887-ecc1d8834465';   
    } else if(gstin == '05AAFCD5862R012') {
        owner_id = '4e2fa82c-7646-4ea3-99bf-e3ea7e20a158';   
    } else {
        res.send('Select Correct Seller GSTIN');
    }

    if (docType == 'Einvoice') {
        reqMethod = 'get'
        reqUrl = 'https://einvoicing.internal.cleartax.co/v2/eInvoice/download?' + 'template=' + invTemplate + '&format=' + format + '&irns=' + irn;
        reqData = ''
    } else if(docType == 'Ewaybill') {
        reqMethod = 'post'
        reqUrl = 'https://einvoicing.internal.cleartax.co/v2/eInvoice/ewaybill/print?' + '&format=' + format;
        reqData = ewbData
    } else if(docType == 'B2c') {
        reqMethod = 'post'
        reqUrl = 'https://einvoicing.internal.cleartax.co/v1/b2c/download-pdf?template=TEMPLATE1';
        reqData = [transId]
    } else {
        res.send('Send Valid Document');
    }

    const config = {
        method: reqMethod,
        url: reqUrl,
        headers: { 
            'x-cleartax-auth-token': ' 1.450f0b99-ea85-491f-b7ca-c30bd6f071d5_8dd03598d1174854767eccf030a229435a563c2f5165e29d4c44cdf306ba7796', 
            'Content-Type': ' application/json',
            'owner_id': owner_id, 
            'gstin': gstin
        },
        data : reqData,
        responseType: 'arraybuffer',
        responseEncoding: null
    };

    axios(config)
    .then(function (response) {
        res.setHeader('Content-Type', 'application/pdf')
        res.status(200).send(Buffer.from(response.data));
    })
    .catch(function (error) {
        res.status(400).json({ message: error.message });
    })

})

module.exports = router;
const express = require('express');
const { pipeline } = require('stream');
const { promisify } = require('util');
const router = express.Router();
const streamPipeline = promisify(pipeline);

router.get('/download-file/:id', async (req, res) => {
  const fileId = req.params.id;
  const targetUrl = `https://lmadev.cerebra-consulting.com/entellitrak/api/endpoints/case/getFileById?id=${fileId}`;

  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Cookie: 'JSESSIONID=E9498997009C6E91806349EE5E8E14A3',
      },
    });

    if (!response.ok) {
      return res.status(response.status).send('Error downloading file', response.statusText);
    }

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    const disposition = response.headers.get('content-disposition');
    if (disposition) {
      res.setHeader('Content-Disposition', disposition);
    }

    await streamPipeline(response.body, res);
  } catch (err) {
    console.error('File download failed:', err);
    res.status(500).send('Internal server error while downloading file');
  }
});

module.exports = router;
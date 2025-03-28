const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3030;
app.use(cors());

const fileProxyRouter = require('./routes/fileproxy');


const BASE_URL = 'https://lmadev.cerebra-consulting.com/entellitrak/api/endpoints/case';
const COOKIE = 'JSESSIONID=C01A30373B8B7C6A5E1B5ED2959035A9';

const testComment = {
  "id": "test55555",
  "text": "test text from gateway",
  "date": "1-30-2025",
  "email": "agc@def.com",
  "town": "abc",
  "caseId": "abc",
  "fName": "first",
  "lname": "last"
  };

  // POST /comment - Create a new comment
app.post('/comment', async (req, res) => { 
  try {
    const response = await axios.get(`${BASE_URL}/getAllCases`, {
      headers: {
        Cookie: COOKIE,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cases', error: error.message });
  }
})

// GET /cases/ - Fetch all cases
app.get('/cases', async (req, res) => {
  try {
    const response = await axios.post(`https://lmadev.cerebra-consulting.com/entellitrak/api/endpoints/public/portal/addComment`, testComment, {
      headers: {
        Cookie: COOKIE,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cases', error: error.message });
  }
});

// GET /case/:matterId - Fetch a specific case by matterId
app.get('/case/:matterId', async (req, res) => {
  const { matterId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/getCase`, {
      headers: {
        Cookie: COOKIE,
      },
      params: {
        matterId,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching case', error: error.message });
  }
});

// GET /events- Fetch all events across all cases
app.get('/events', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllTasks`, {
      headers: {
        Cookie: COOKIE,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
})

app.use('/api', fileProxyRouter); //  /api/download-file/:id

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

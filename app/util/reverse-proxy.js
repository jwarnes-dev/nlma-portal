const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3030;
app.use(cors());


const BASE_URL = 'https://lmadev.cerebra-consulting.com/entellitrak/api/endpoints/case';
const COOKIE = 'JSESSIONID=3689B726C01927E72DD8DD836332353E';

// GET /cases/ - Fetch all cases
app.get('/cases', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
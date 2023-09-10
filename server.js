const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const FIREBLOCKS_API_KEY = '534ce01f-5d2e-49d4-a21d-137eb06e41eb'; // Replace with your Fireblocks API key

app.post('/authorize-fireblocks', async (req, res) => {
  try {
    const response = await axios.post('https://api.fireblocks.io/v1/wallets', {}, {
      headers: {
        'X-API-Key': FIREBLOCKS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const FIREBLOCKS_API_KEY = '534ce01f-5d2e-49d4-a21d-137eb06e41eb'; // Replace with your Fireblocks API key
const jwt = require('jsonwebtoken');

// Function to generate a unique nonce (example implementation)
function generateUniqueNonce() {
  // Implement your logic to generate a unique nonce here
  // It could be a random string or a counter, depending on your requirements
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Function to calculate the SHA-256 hash of the request body
function calculateBodyHash(requestBody) {
  const hash = crypto.createHash('sha256');
  hash.update(requestBody);
  return hash.digest('hex');
}


function generateJwt() {
    const API_SECRET = `-----BEGIN PRIVATE KEY-----
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
hST3kOWtvaAz3J+e9V73jq3DbEVF6poF
-----END PRIVATE KEY-----`; // Replace with your Fireblocks API secret
    const payload = {
      uri: '/v1/vault/accounts_paged',
      method: 'GET',
      body: {},
      nonce: generateUniqueNonce(), // Implement a function to generate a unique nonce
      iat: Math.floor(Date.now() / 1000), // Current time in seconds since Epoch
      exp: Math.floor(Date.now() / 1000) + 60, // Expires in 60 seconds
      sub: FIREBLOCKS_API_KEY,
      bodyHash: calculateBodyHash('raw_http_request_body')
    };
    const token = jwt.sign(payload, API_SECRET, { algorithm: 'RS256'   });
    return token;
  }
  
// app.post('/authorize-fireblocks', async (req, res) => {
//   try {
//     const response = await axios.post('https://sandbox-api.fireblocks.io/v1/wallets', {}, {
//       headers: {
//         'X-API-Key': FIREBLOCKS_API_KEY,
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.post('/authorize-fireblocks', async (req, res) => {
    try {
      const jwtToken = generateJwt();
      console.log (jwtToken);  
      const response = await axios.get('https://sandbox-api.fireblocks.io/v1/vault/accounts_paged', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'X-API-Key': FIREBLOCKS_API_KEY,
        },
      });
      console.log(response);
      res.json(response.data);
    } catch (error) {
      console.error(error.response.data);
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dropdown = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__dropdown);

const app = express();

app.use(express.static('public'));

// 1. Generate the JWT for Tableau Connected App
app.get('/get-tableau-token', (req, res) => {
    const payload = {
        iss: process.env.TABLEAU_CLIENT_ID,
        sub: 'fcastilani@salesforce.com', // The Tableau user email/username
        aud: 'tableau',
        exp: Math.floor(Date.now() / 1000) + (10 * 60), // 10 min expiry
        jti: uuidv4(),
        scp: ["tableau:views:embed", "tableau:views:embed_authoring"]
    };

    const token = jwt.sign(payload, process.env.TABLEAU_SECRET_VALUE, {
        algorithm: 'HS256',
        header: {
            kid: process.env.TABLEAU_SECRET_ID,
            iss: process.env.TABLEAU_CLIENT_ID
        }
    });
    console.log(">>> Browser requested a token at: " + new Date().toISOString());
    res.json({ token });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, () => console.log('Superstore Portal running on http://localhost:3000'));
const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');


app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
  console.log(`Using API key: ${process.env.GOOGLE_GEMINI_KEY ? 'Loaded' : 'Missing!'}`);
});

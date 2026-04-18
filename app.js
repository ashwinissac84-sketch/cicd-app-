const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Deployed via GitHub Actions!', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

module.exports = app;
if (require.main === module) {
  app.listen(PORT, () => console.log('Server on port ' + PORT));
}
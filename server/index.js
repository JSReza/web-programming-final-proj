const express = require('express')
const activityController = require('./controller/activity');
const friendController = require('./controller/friends');
const PORT = process.env.PORT ?? 8000
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config()

app.use('/api/v1/activities', activityController);
app.use('/api/v1/friends', friendController);

app.get('/hello', (req, res) => {
  res.send('Hello New Paltz, NY!!!')
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
  app.use('/', express.static('dist'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});



console.log('Hello World!')
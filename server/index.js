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


  app.use('/', express.static('dist'))

.use((err, req, res, next) => {
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
const express = require('express')
const activityController = require('./controller/activity')
const PORT = 8000

const app = express();

app
.get('/', (req, res) => {
  res.send('Hello New Paltz, NY!!!')
})
.use('/activities', activityController)
.use(express.json())
.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});



console.log('Hello World!')
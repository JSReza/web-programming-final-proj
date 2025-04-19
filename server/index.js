const express = require('express')
const activityController = require('./controller/activity')
const PORT = 8000

const app = express();

app
.get('/', (req, res) => {
  res.send('Hello New Paltz, NY!!!')
})
.use('/activities', activityController)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});



console.log('Hello World!')
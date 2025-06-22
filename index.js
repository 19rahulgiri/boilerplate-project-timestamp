const express = require('express');
const app = express();

// Enable CORS (for FCC testing)
const cors = require('cors');
app.use(cors());

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  // If no date provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if it's a UNIX timestamp
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // If date is invalid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

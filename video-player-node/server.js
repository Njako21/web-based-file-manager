const express = require('express');
const path = require('path');
const cors = require('./middlewares/cors');
const mediaRoutes = require('./routes/media');
const indexRoutes = require('./routes/index');

const app = express();

app.use(cors);
app.use(express.static('public'));

app.use('/api', indexRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

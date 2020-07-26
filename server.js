const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`));

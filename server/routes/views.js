const express = require('express');
const path = require('path');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const viewRoutes = express.Router();

// This section will help you get a list of all the records.
viewRoutes.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '/public/views/index.html'))
});

module.exports = viewRoutes;

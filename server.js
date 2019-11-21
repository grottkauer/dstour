const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/ds-tour'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/ds-tour/index.html'));
});

app.listen(process.env.PORT || 8080);

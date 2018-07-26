var express = require('express');
var router = express.Router();
var path = require('path');


var storageRoutes = require('./storageRoutes');
var issueAndPassRoutes = require('./issueAndPassRoutes');
var searchRoutes = require('./searchRoutes');


/* GET home page. */
router.get('/', function(req, res, next) {

 	res.sendFile(path.join(__dirname, '../views/html', 'index.html'));
 	

});


router.use('/storageManagement', storageRoutes);
router.use('/issueAndPass', issueAndPassRoutes);
router.use('/search', searchRoutes);


/* GET home page. */
router.get('/static', function(req, res, next) {

  res.render('index', { title: 'Static', text: 'Static text' });

});


module.exports = router;


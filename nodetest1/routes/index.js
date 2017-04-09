var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The List' });
});

router.post('/api/list', function(req, res, next) {
    var db = req.db;
    var collection = db.get('thelist');
    var string = req.body.text;
    collection.insert({"val":string}, {}, function(err, records) {
        res.redirect('/list');
    });
});

/* GET Userlist page. */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('thelist');
    collection.find({},{},function(e,docs){
        res.render('list', {
            "textlist" : docs
        });
    });
});

module.exports = router;

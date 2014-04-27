var express = require('express');
var db = require('./db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

// GET Userlist page
router.get('/userlist', function(req, res){
    db.PUser.find({}, {}, function (e, docs) {
        res.render('userlist', {"userlist": docs});
    });
});

// Add new user page
router.get('/addnewuser', function(req, res){
    res.render('addnewuser', {title: 'Add New User'});
});

/* POST to Add User Service */
router.post('/adduseraction', function(req, res) {
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Create user manually
    var newuser = new db.PUser({
        username: userName,
        email: userEmail
    });

    // Save user to database
    newuser.save(function (err) {
        if (err) {
            console.log ('Error on save!')
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
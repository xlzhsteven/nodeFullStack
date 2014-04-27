var express = require('express');
var router = express.Router();

// --------------- Connect to MongoLab --------------- //
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI ||
    'localhost:27017/nodetest1';

mongoose.connect(uristring, function(err, res){
    if(err){
        console.log('ERROR connection to ' + uristring + '. ' + err);
    } else{
        console.log('Succeeded connected to: ' + uristring);
    }
});

// --------------- Schema --------------- //
var userSchema = new mongoose.Schema({
    username: String,
    email: String
});

// --------------- Setup model --------------- //
var PUser = mongoose.model('usercollections', userSchema);

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
    PUser.find({},{},function(e, docs){
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
    var newuser = new PUser ({
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
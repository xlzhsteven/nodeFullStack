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
    db.emailUserModel.find({}, {}, function (e, docs) {
        res.render('userlist', {"userlist": docs});
    });
});

// Add new user page
router.get('/userDatabaseModification', function (req, res) {
    res.render('userDatabaseModification', {title1: 'Add New User', title2: "Remove User by Name"});
});

/* POST to Add User Service */
router.post('/adduseraction', function(req, res) {
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Create user manually
    var newuser = new db.EmailUserModel({
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

/* POST to Remove User by Name */
router.post('/removeuseraction', function (req, res) {
//    Get userName from form
    var userName = req.body.removename;
    db.emailUserModel.findOne({username: userName}, function (err, doc) {
        if (!err) {
            console.log(doc);
            if (doc === null) {
                res.redirect("userlist");
                console.log(userName + " does not exist in the database");
//                TODO: Add error handling when user doesn't exist
            } else {
                doc.remove();
                res.redirect("userlist");
                console.log(userName + " has been successfully removed from the database");
            }
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
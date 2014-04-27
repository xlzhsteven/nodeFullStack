// --------------- Connect to MongoLab --------------- //
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI ||
    'localhost:27017/nodetest1';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connection to ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

// --------------- Schema --------------- //
var UserSchema = new mongoose.Schema({
    username: String,
    email: String
});

// --------------- Setup model --------------- //
var EmailUserModel = mongoose.model('usercollections', UserSchema);

// --------------- Expose PUser variable --------------- //
module.exports.EmailUserModel = EmailUserModel;
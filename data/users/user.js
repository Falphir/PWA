let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a schema
let UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
});

//the schema is useless so far
//we need to create a model using it
let User = mongoose.model('User', UserSchema);

//make this available to our users in our Node applications
module.exports = User;
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//criar uma schema
let UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//criar um modelo para usar o schema
let User = mongoose.model('User', UserSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = User;
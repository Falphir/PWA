let mongoose = require('mongoose');
const scopes = require('./scopes');
let Schema = mongoose.Schema;

let RoleSchema = new Schema({
    name: { type: String, required: true },
    scopes: [{ type: String, enum: [scopes ["read-all"], scopes["read-posts"], scopes["manage-posts"]] }]
});

//criar uma schema
let UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: RoleSchema }
});

//criar um modelo para usar o schema
let User = mongoose.model('User', UserSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = User;
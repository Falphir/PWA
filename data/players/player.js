let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Hobbies = new Schema({
    name: { type: String, required: true},
});

//criar uma schema
let PlayerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    hobbies: [{type: Hobbies}],
    age: {type: Number, required: true}
});

//criar um modelo para usar o schema
let Player = mongoose.model('Player', PlayerSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Player;
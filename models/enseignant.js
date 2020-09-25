var mongoose=require('mongoose');
var EnseignantSchema=mongoose.Schema({

    email: {
        type :String,
        required: true
    } ,
    role: {
        type :String,
        required: true,
        default: "enseignant"
    } ,

    password: {
        type :String,
        required: true
    } ,

    classe : [String],
    matiere:[String]

});


var Enseignant = mongoose.model('Enseignant',EnseignantSchema);

module.exports = Enseignant;

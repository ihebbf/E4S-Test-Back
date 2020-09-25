var mongoose=require('mongoose');
var EtudiantSchema=mongoose.Schema({

    email: {
        type :String,
        required: true
    } ,

    password: {
        type :String,
        required: true
    } ,
    role: {
        type :String,
        required: true,
        default: "etudiant"
    } ,

    classe : String,
    matieres:[{nom:String,coefficient:Number,note:{type:Number,default:null}}],
    moyenne:{
        type :Number,
        default: null   }

});


var Etudiant = mongoose.model('Etudiant',EtudiantSchema);

module.exports = Etudiant;

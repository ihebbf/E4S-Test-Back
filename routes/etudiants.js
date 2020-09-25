var express = require('express');
var router = express.Router();
var Etudiant = require('../models/etudiant');



router.post('/add',  (req, res) => {
    var obj = {
        email: req.body.email,
        password: req.body.password,
        classe: req.body.classe,
        matieres:req.body.matieres

    };
    Etudiant.insertMany(obj);

    res.send(obj);

});

router.get('/get', (req, res) => {
    var etudiant =Etudiant.find({})
        .exec((err, data) => {
            if (err)
                console.log(err)
            else {
                res.send(data);
            }
        })
});

router.post('/login',  (req, res) => {

    let user = User.findOne({
        email:req.body.email
    }).exec((err, data) => {
        if (err)
            console.log(err)
        else {
            if(data===null)
            {
                res.status(400).send("login not ok");          }



            else if(req.body.password!==data.password)
            {
                res.status(400).send("login not ok");          }
            else res.status(200).send("login ok")
        };

    });
});

router.get('/getByClasse/:classe', (req, res) => {
    var etudiant =Etudiant.find({"classe": req.params.classe})
        .exec((err, data) => {
            if (err)
                console.log(err)
            else {
                res.send(data);
            }
        })
});

router.get('/getMatiere/:id', (req, res) => {
    var etudiant =Etudiant.findById({"_id": req.params.id}, (err, data) => {
            if (err)
                console.log(err)
            else {
               res.send(data.matieres)
            }
        })
});

router.put('/modifierNote/:id/:idMatiere',(req,res)=>{
    var etudiant =Etudiant.findById({"_id": req.params.id}, (err, data) => {
        if (err)
            console.log(err)
        else {
            let query = {"_id": req.params.id};
            var note= req.body.note;

            data.matieres.forEach(matiere =>{

                if(matiere._id==req.params.idMatiere){
                    matiere.note=req.body.note


                }




            })
            Etudiant.updateOne(query, data, function (err,Etudiant ) {
                if(err){
                    res.send(err);
                }
                else {
                    res.send(Etudiant)
                }
            });
        }
    })

});

router.get('/CalculerMoyenne/:id',(req,res)=>{
    var somme=0;
    var sommeCoefficient=0;
    var etudiant =Etudiant.findById({"_id": req.params.id}, (err, data) => {
        if (err)
            console.log(err)
        else {
            let query = {"_id": req.params.id};


            data.matieres.forEach(matiere =>{
                sommeCoefficient+=matiere.coefficient
                if(matiere.note==null){
                    res.status(400).send("moyenne pas encore calculée")

                }
                else if(matiere.note!=null)
                {
                    console.log(somme)
                    somme+=matiere.note*matiere.coefficient



                }




            })

            data.moyenne=somme/sommeCoefficient;
            console.log(somme/sommeCoefficient)

            Etudiant.updateOne(query, data, function (err,Etudiant) {
                if(err){
                    res.send(err);
                }
                else {
                    res.send(data)
                }
            });
        }
    })

});


module.exports = router;

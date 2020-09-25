var express = require('express');
var router = express.Router();
var Enseignant = require('../models/enseignant');
var Etudiant = require('../models/etudiant');



router.post('/add',  (req, res) => {
  var obj = {
    email: req.body.email,
    password: req.body.password,
    classe: req.body.classe,
      matiere:req.body.matiere

  };
  Enseignant.insertMany(obj);

  res.send(obj);

});

router.get('/get', (req, res) => {
  var enseignants =Enseignant.find({})
      .exec((err, data) => {
        if (err)
          console.log(err)
        else {
          res.send(data);
        }
      })
});

router.post('/login',  (req, res) => {

  let user = Enseignant.findOne({
    email:req.body.email
  }).exec((err, data) => {
      if (err)
          console.log(err)
      else {
          if(data===null) {
              Etudiant.findOne({
                  email:req.body.email
              }).exec((err, data) => {
                  if (err)
                      console.log(err)
                  else{
                      if(data===null)
                          res.status(400).send("login not ok")
                      else if(req.body.password!==data.password)
                      {
                          res.status(400).send("login not ok");          }
                      else res.status(201).send(data)


                  }
              })

          }



          else if(req.body.password!==data.password)
          {
              res.status(400).send("login not ok");          }
          else res.status(200).send(data)
      };

});
});

router.get('/getClasse/:id/', (req, res) => {
    let query = {"_id": req.params.id};
    Enseignant.findById(query, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data.classe)


            }

        });
});

module.exports = router;

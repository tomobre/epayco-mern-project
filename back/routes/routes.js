const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
router.post("/signup", (req, res) => {
  const signedUpUser = new signUpTemplateCopy({
    name: req.body.name,
    document: req.body.document,
    email: req.body.email,
    cellphone: req.body.cellphone,
  });
  signedUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const userModelsCopy = require("../models/UserModels");

router.post("/signup", (req, res) => {
  const signedUpUser = new userModelsCopy({
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

router.put(`/updatewallet`, async (req, res) => {
  try {
    const updateUser = await userModelsCopy.findOneAndUpdate(
      { document: req.body.document, cellphone: req.body.cellphone },
      { wallet: req.body.wallet },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
    console.log(updateUser);
  } catch (err) {
    console.log(err);
  }
});

router.get(`/check`, async (req, res) => {
  try {
    const checkWallet = await userModelsCopy.findOne({
      document: req.body.document,
      cellphone: req.body.cellphone,
    });
    console.log(checkWallet);
    checkWallet
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

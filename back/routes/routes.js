const express = require("express");
const router = express.Router();
const userModelsCopy = require("../models/UserModels");
const nodemailer = require("nodemailer");

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
      console.log(err);
      res.json({ message: "Ya existe el usuario", err: err });
    });
});

router.put(`/updatewallet`, async (req, res) => {
  try {
    const updateUser = await userModelsCopy.findOneAndUpdate(
      { document: req.body.document, cellphone: req.body.cellphone },
      { wallet: req.body.wallet },
      (err, data) => {
        if (data === null) {
          res.json({
            message: "No existe el documento/celular correspondiente",
            err: err,
          });
          console.log({
            message: "no existe el documento/celular correspondiente",
            err: err,
          });
        } else {
          console.log(data);
          res.json(data);
        }
      }
    );
  } catch (err) {}
});

router.get(`/:document`, async (req, res) => {
  const document = req.params.document;
  try {
    const checkWallet = await userModelsCopy.findOne({
      document: document,
    });
    checkWallet.save();
    res.json(checkWallet);
    console.log(checkWallet);
  } catch (err) {
    console.log({
      message: "No existe el documento en la base de datos",
      err: err,
    });
    res.json({
      message: "No existe el documento en la base de datos",
      err: err,
    });
  }
});

router.get(`/em/:email`, async (req, res) => {
  const email = req.params.email;
  try {
    const checkEmail = await userModelsCopy.findOne({
      email: email,
    });
    checkEmail.save();
    console.log(checkEmail);
    res.json(checkEmail);
  } catch (err) {
    console.log(err);
    res.json({
      message: "No existe el email en la base de datos",
      err: err,
    });
  }
});

router.put(`/gettoken`, async (req, res) => {
  try {
    const updateUserToken = await userModelsCopy.findOneAndUpdate(
      { email: req.body.email },
      { buyToken: req.body.buyToken },
      (err, data) => {
        if (data === null) {
          console.log({
            message: "El email no existe en la base de datos",
            err: err,
          });
          res.json({
            message: "El email no existe en la base de datos",
            err: err,
          });
        } else {
          console.log(data);
          let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "e.com.no.reply.test@gmail.com",
              pass: "1aaaaaaaaa9",
            },
          });

          let mailOptions = {
            from: "tomobre@gmail.com",
            to: data.email,
            subject: "ID y Token para confirmar compra en EpayCo",
            text: `ID: ${data._id}, TOKEN: ${data.buyToken}`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log({
                message: "El email no existe en la base de datos",
                err: err,
              });
            } else {
              console.log("Email enviado");
              res.status(200).jsonp(req.body);
            }
          });
        }
      }
    );
    console.log(updateUserToken);
  } catch (err) {}
});

router.put(`/buyupdatewallet`, async (req, res) => {
  try {
    const updateWallet = await userModelsCopy.findOneAndUpdate(
      { email: req.body.email },
      { wallet: req.body.wallet },
      (err, data) => {
        if (data === null) {
          res.json({
            message: "no existe el email en la base de datos",
            err: err,
          });
        } else {
          console.log(data);
          res.json(data);
        }
      }
    );
    console.log(updateWallet);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

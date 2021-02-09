const express = require("express");
const router = express.Router();
const userModelsCopy = require("../models/UserModels");
const nodemailer = require("nodemailer");

router.post("/signup", async (req, res, next) => {
  try {
    const checkIfEmail = await userModelsCopy.findOne({
      email: req.body.email,
    });
    const checkIfDocument = await userModelsCopy.findOne({
      document: req.body.document,
    });
    const checkIfCellphone = await userModelsCopy.findOne({
      cellphone: req.body.cellphone,
    });

    if (
      checkIfEmail !== null ||
      checkIfDocument !== null ||
      checkIfCellphone !== null
    ) {
      next(new Error("El mail, documento, o celular ya existe"));
    } else {
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
          res.json({
            message: "ocurrio un error con la base de datos",
            err: err,
          });
        });
    }
  } catch (err) {
    res.json({ message: "ocurrio un error en la base de datos", err: err });
  }
});

router.put(`/updatewallet`, async (req, res, next) => {
  try {
    const updateUser = await userModelsCopy.findOneAndUpdate(
      { document: req.body.document, cellphone: req.body.cellphone },
      { wallet: req.body.wallet },
      (err, data) => {
        if (data === null) {
          next(new Error("No existe el documento/celular correspondiente"));

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

router.get(`/:document`, async (req, res, next) => {
  const document = req.params.document;
  try {
    const checkWallet = await userModelsCopy.findOne({
      document: document,
    });
    if (checkWallet !== null) {
      res.json(checkWallet);
      console.log(checkWallet);
    } else {
      next(new Error("No existe el documento en la base de datos"));
    }
  } catch (err) {
    console.log({
      message: "Hay un problema con la base de datos",
      err: err,
    });
  }
});

router.get(`/em/:email`, async (req, res, next) => {
  const email = req.params.email;
  try {
    const checkEmail = await userModelsCopy.findOne({
      email: email,
    });
    if (checkEmail !== null) {
      console.log(checkEmail);
      res.json(checkEmail);
    } else {
      next(new Error("No existe el mail en la base de datos."));
    }
  } catch (err) {
    console.log(err);
  }
});

router.put(`/gettoken`, async (req, res, next) => {
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
          next(new Error("El mail no existe en la base de datos"));
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

router.put(`/buyupdatewallet`, async (req, res, next) => {
  try {
    const updateWallet = await userModelsCopy.findOneAndUpdate(
      { email: req.body.email },
      { wallet: req.body.wallet },
      (err, data) => {
        if (data === null) {
          next(new Error("No existe el email en la base de datos"));
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

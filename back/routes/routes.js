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

router.get(`/:document`, async (req, res) => {
  const document = req.params.document;
  try {
    const checkWallet = await userModelsCopy.findOne({
      document: document,
    });
    checkWallet
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
    console.log(checkWallet);
  } catch (err) {
    console.log(err);
  }
});

router.get(`/em/:email`, async (req, res) => {
  const email = req.params.email;
  try {
    const checkEmail = await userModelsCopy.findOne({
      email: email,
    });
    checkEmail
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
    console.log(checkEmail);
  } catch (err) {
    console.log(err);
  }
});

router.put(`/gettoken`, async (req, res) => {
  try {
    const updateUserToken = await userModelsCopy.findOneAndUpdate(
      { email: req.body.email },
      { buyToken: req.body.buyToken },
      (err, data) => {
        if (err) {
          console.log(err);
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

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).send(error.message);
            } else {
              console.log("Email enviado");
              res.status(200).jsonp(req.body);
            }
          });
        }
      }
    );
    console.log(updateUserToken);
  } catch (err) {
    console.log(err);
  }
});

router.put(`/buyupdatewallet`, async (req, res) => {
  try {
    const updateWallet = await userModelsCopy.findOneAndUpdate(
      { email: req.body.email },
      { wallet: req.body.wallet },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
    console.log(updateWallet);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

import "./App.css";
import React from "react";
import axios from "axios";
import { uid } from "rand-token";

function Buy() {
  let userInfo;
  const [conf, setConf] = React.useState({ conf: false });
  const [insertEmail, setInsertEmail] = React.useState({ insertEmail: false });
  const [whichSer, setWhichSer] = React.useState({ whichSer: "" });
  const [captureEmail, setCaptureEmail] = React.useState({ captureEmail: "" });
  const [id, setId] = React.useState({ id: "" });
  const [captureId, setCaptureId] = React.useState({ captureId: "" });
  const [captureToken, setCaptureToken] = React.useState({ captureToken: "" });
  const [response, setResponse] = React.useState({ response: "" });
  const [wallet, setWallet] = React.useState({ wallet: "" });
  const [tokenCheck, setTokenCheck] = React.useState("");

  const handleClickBuy = () => (e) => {
    setInsertEmail({ insertEmail: true });
    setWhichSer({ whichSer: e.target.name });
  };

  const handleClickConf = async () => {
    const confirming = window.confirm(
      `Esta seguro que desea comprar el servicio ${whichSer.whichSer}?`
    );
    if (confirming) {
      setConf({ conf: true });
      console.log("confirmed");
    }

    try {
      let res = await axios.get(
        `http://localhost:4000/app/em/${captureEmail.captureEmail}`
      );
      userInfo = await res.data;
      setId({ id: userInfo._id });
      setWallet({ wallet: userInfo.wallet });
      console.log(userInfo);
    } catch (err) {
      console.log(err);
    }

    try {
      const token = uid(6);
      let res = await axios.put(`http://localhost:4000/app/gettoken`, {
        email: captureEmail.captureEmail,
        buyToken: token,
      });
      let check = await res.data;
      setTokenCheck(check.buyToken);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = () => (e) => {
    e.target.name === "captureEmail"
      ? setCaptureEmail({ [e.target.name]: e.target.value })
      : e.target.name === "captureToken"
      ? setCaptureToken({ [e.target.name]: e.target.value })
      : e.target.name === "captureId"
      ? setCaptureId({ [e.target.name]: e.target.value })
      : console.log("error");
  };

  const confirmToken = async () => {
    const checkId = id.id;
    if (
      checkId === captureId.captureId &&
      captureToken.captureToken === tokenCheck
    ) {
      let price;

      if (whichSer.whichSer === "1") {
        price = 100;
      }
      if (whichSer.whichSer === "2") {
        price = 200;
      }
      let finalWallet = parseInt(wallet.wallet - price, 10);

      try {
        if (finalWallet >= 0) {
          setResponse({
            response: `Se ha realizado la compra con exito. El saldo actual de la billetera es de ${finalWallet}$`,
          });
          console.log(finalWallet);
          setWallet({ wallet: finalWallet });

          let res = await axios.put(
            `http://localhost:4000/app/buyupdatewallet`,
            {
              email: captureEmail.captureEmail,
              wallet: finalWallet,
            }
          );
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
      if (finalWallet < 0) {
        setResponse({
          response:
            "No hay dinero suficiente en su billetera para realizar la compra",
        });
      }
    } else {
      setResponse({ response: "El ID/Token no es correcto" });
    }
  };

  return (
    <div>
      <h1>Comprar</h1>
      <button onClick={handleClickBuy()} name="1">
        Servicio 1
      </button>
      <button onClick={handleClickBuy()} name="2">
        {" "}
        Servicio 2
      </button>
      {insertEmail.insertEmail && (
        <div>
          <input
            name="captureEmail"
            value={captureEmail.captureEmail}
            onChange={handleChange()}
            type="text"
            placeholder="mail del usuario"
          ></input>
          <button type="button" onClick={handleClickConf}>
            Comprar
          </button>
        </div>
      )}
      {conf.conf && (
        <div>
          <h2>
            Se generó un token y un id especial que se ha mandado a su cuenta de
            mail. Ingreselo para confirmar la compra
          </h2>
          <input
            value={captureId.captureId}
            onChange={handleChange()}
            name="captureId"
            placeholder="id"
            type="text"
          />
          <input
            value={captureToken.captureToken}
            onChange={handleChange()}
            name="captureToken"
            placeholder="token"
            type="text"
          />
          <button onClick={confirmToken}>Confirmar compra</button>

          <div id="okBuyOrNot">{response.response}</div>
        </div>
      )}
    </div>
  );
}

export default Buy;

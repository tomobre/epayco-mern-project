import "./App.css";
import React from "react";
import axios from "axios";
import { uid } from "rand-token";
import { useForm } from "react-hook-form";

function Buy() {
  const { register, errors, handleSubmit } = useForm();
  let userInfo;
  const [conf, setConf] = React.useState({ conf: false, mes: "" });
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
    setConf({
      conf: false,
      mes: "",
    });
    const confirming = window.confirm(
      `Esta seguro que desea comprar el servicio ${whichSer.whichSer}?`
    );
    if (confirming) {
      console.log("confirmed");

      try {
        let res = await axios.get(
          `http://localhost:4000/app/em/${captureEmail.captureEmail}`
        );
        userInfo = await res.data;
        setId({ id: userInfo._id });
        setWallet({ wallet: userInfo.wallet });
        console.log(userInfo);
        setConf({
          conf: true,
          mes:
            "Se generó un TOKEN y un ID que se ha enviado a su cuenta de mail. Ingreselo para confirmar la compra.",
        });
      } catch (err) {
        console.log(err);
        setConf({
          conf: "error",
          mes: `Hubo un error con el mail del usuario elegido: ${err.response.data.error.message}`,
        });
      }
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
      <h1 className="my-5">Comprar</h1>
      <button
        className="me-4 mb-5 btn btn-secondary"
        onClick={handleClickBuy()}
        name="1"
      >
        Servicio 1 <br />
        (100$)
      </button>
      <button
        onClick={handleClickBuy()}
        name="2"
        className="me-4 mb-5 btn btn-secondary"
      >
        {" "}
        Servicio 2 <br />
        (200$)
      </button>
      {insertEmail.insertEmail && (
        <div>
          <input
            ref={register({
              required: { value: true, message: "El email es obligatorio" },
              maxLength: {
                value: 30,
                message: "No más de 30 caracteres",
              },
              minLength: {
                value: 5,
                message: "Mínimo 2 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Debe ser un email valido",
              },
            })}
            name="captureEmail"
            value={captureEmail.captureEmail}
            onChange={handleChange()}
            type="text"
            placeholder="Mail del usuario"
          ></input>
          <button
            className="ms-4 btn btn-primary"
            type="button"
            onClick={handleSubmit(handleClickConf)}
          >
            Comprar
          </button>
          <br />
          <span className="text-danger text-small d-block mb-2">
            {errors.captureEmail && errors.captureEmail.message}
          </span>
        </div>
      )}
      {conf.conf === true && (
        <div>
          <p className="mt-4 mb-5">{conf.mes}</p>
          <input
            className="me-5"
            value={captureId.captureId}
            onChange={handleChange()}
            name="captureId"
            placeholder="ID"
            type="text"
          />
          <input
            className="mt-3"
            value={captureToken.captureToken}
            onChange={handleChange()}
            name="captureToken"
            placeholder="TOKEN"
            type="text"
          />
          <br />
          <button className="btn btn-primary mt-5" onClick={confirmToken}>
            Confirmar compra
          </button>

          <div className="mt-4" id="okBuyOrNot">
            {response.response}
          </div>
        </div>
      )}
      {conf.conf === "error" && (
        <span className="text-danger text-small d-block mt-2">{conf.mes}</span>
      )}
    </div>
  );
}

export default Buy;

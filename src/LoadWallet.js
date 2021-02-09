import "./App.css";
import React from "react";
import axios from "axios";
let bringWallet;
let final;

function LoadWallet() {
  const [document, setDocument] = React.useState({
    document: "",
  });
  const [cellphone, setCellphone] = React.useState({
    cellphone: "",
  });
  const [value, setValue] = React.useState({
    value: "",
  });
  const [updated, setUpdate] = React.useState(false);

  const handleChange = () => (e) => {
    e.target.name === "document"
      ? setDocument({ [e.target.name]: parseInt(e.target.value, 10) })
      : e.target.name === "cellphone"
      ? setCellphone({ [e.target.name]: parseInt(e.target.value, 10) })
      : e.target.name === "value"
      ? setValue({ [e.target.name]: parseInt(e.target.value, 10) })
      : console.log("error");
  };

  const onSubmit = async () => {
    setUpdate(false);
    try {
      let res = await axios.get(
        `http://localhost:4000/app/${document.document}`
      );
      bringWallet = await res.data.wallet;

      console.log(bringWallet);
    } catch (err) {
      console.log(err);
    }

    try {
      const newValue = value.value + bringWallet;
      final = newValue;
      console.log(newValue);
      setUpdate(true);
      let res = await axios.put(`http://localhost:4000/app/updatewallet`, {
        document: document.document,
        cellphone: cellphone.cellphone,
        wallet: newValue,
      });
      final = await res.data.wallet;
      console.log(final);
    } catch (err) {
      console.log(err);
    }

    setCellphone({ cellphone: "" });
    setDocument({ document: "" });
    setValue({ value: "" });
    setUpdate(false);
  };

  return (
    <div>
      <h1 className="my-5">Cargar saldo</h1>
      <form>
        <input
          className="me-5"
          value={document.document}
          onChange={handleChange()}
          name="document"
          placeholder="Documento"
          type="text"
        />
        <input
          className="me-5"
          value={cellphone.cellphone}
          onChange={handleChange()}
          name="cellphone"
          placeholder="Celular"
          type="text"
        ></input>
        <input
          className="me-5"
          value={value.value}
          onChange={handleChange()}
          name="value"
          placeholder="Valor"
          type="text"
        ></input>
        <br />
        <button
          className="mt-4 btn btn-primary"
          type="button"
          onClick={onSubmit}
        >
          CARGAR
        </button>
      </form>

      {updated && <h3 className="mt-4">Su nuevo saldo es de {final}$</h3>}
    </div>
  );
}

export default LoadWallet;

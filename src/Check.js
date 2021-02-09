import "./App.css";
import React from "react";
import axios from "axios";

let wallet;

function Check() {
  const [document, setDocument] = React.useState({ document: "" });

  const handleChange = () => (e) => {
    setDocument({ [e.target.name]: parseInt(e.target.value, 10) });
  };

  const onSubmit = async () => {
    try {
      let res = await axios.get(
        `http://localhost:4000/app/${document.document}`
      );
      wallet = await res.data.wallet;
    } catch (err) {
      console.log(err);
    }

    setDocument({ document: "" });
  };

  return (
    <div>
      <h1 className="my-5">Consultar saldo</h1>
      <form>
        <input
          value={document.document}
          onChange={handleChange()}
          name="document"
          placeholder="Documento"
          type="number"
        />
        <br />
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={onSubmit}
        >
          CONSULTAR
        </button>
      </form>
      {wallet !== undefined && (
        <h3 className="mt-3">Su saldo es de {wallet}$</h3>
      )}
    </div>
  );
}

export default Check;

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
      <h1>consultar saldo</h1>
      <form>
        <input
          value={document.document}
          onChange={handleChange()}
          name="document"
          placeholder="documento"
          type="number"
        />
        <button type="button" onClick={onSubmit}>
          Enter
        </button>
      </form>
      {wallet !== undefined && <h1>Su sueldo es de {wallet}$</h1>}
    </div>
  );
}

export default Check;

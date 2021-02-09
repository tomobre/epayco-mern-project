import "./App.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

let wallet;

function Check() {
  const { register, errors, handleSubmit } = useForm();
  const [document, setDocument] = React.useState({ document: "" });
  const [response, setResponse] = React.useState({ response: "", message: "" });

  const handleChange = () => (e) => {
    setDocument({ [e.target.name]: parseInt(e.target.value, 10) });
  };

  const onSubmit = async () => {
    setResponse({
      response: "",
      message: "",
    });
    try {
      let res = await axios.get(
        `http://localhost:4000/app/${document.document}`
      );
      wallet = await res.data.wallet;
      setResponse({ response: true, message: `Su saldo es de ${wallet}$ ` });
    } catch (err) {
      setResponse({
        response: false,
        message: `Hubo un error al intentar ver su saldo: ${err} `,
      });
      console.log(err);
    }

    setDocument({ document: "" });
  };

  return (
    <div>
      <h1 className="my-5">Consultar saldo</h1>
      <form>
        <input
          ref={register({
            required: { value: true, message: "El documento  es obligatorio" },
            maxLength: {
              value: 15,
              message: "No más de 15 caracteres",
            },
            minLength: {
              value: 4,
              message: "Mínimo 4 caracteres",
            },
          })}
          value={document.document}
          onChange={handleChange()}
          name="document"
          placeholder="Documento"
          type="number"
        />
        <br />
        <span className="text-danger text-small d-block mb-2">
          {errors.document && errors.document.message}
        </span>
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          CONSULTAR
        </button>
      </form>

      {response.response === true && (
        <h3 className="mt-3">{response.message}</h3>
      )}

      {response.response === false && (
        <h3 className="mt-3">{response.message}</h3>
      )}
    </div>
  );
}

export default Check;

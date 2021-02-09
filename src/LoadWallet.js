import "./App.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
let bringWallet;
let final;

function LoadWallet() {
  const { register, errors, handleSubmit } = useForm();
  const [document, setDocument] = React.useState({
    document: "",
  });
  const [cellphone, setCellphone] = React.useState({
    cellphone: "",
  });
  const [value, setValue] = React.useState({
    value: "",
  });
  const [bringUser, setBringUser] = React.useState({
    response: "",
    message: "",
  });
  const [updated, setUpdated] = React.useState({
    response: "",
    message: "",
  });

  const handleChange = () => (e) => {
    e.target.name === "document"
      ? setDocument({ [e.target.name]: e.target.value })
      : e.target.name === "cellphone"
      ? setCellphone({ [e.target.name]: e.target.value })
      : e.target.name === "value"
      ? setValue({ [e.target.name]: e.target.value })
      : console.log("error");
  };

  const onSubmit = async () => {
    setBringUser({ response: "", message: "" });
    setUpdated({ response: "", message: `` });
    try {
      setBringUser({ response: true, message: "" });
      let res = await axios.get(
        `http://localhost:4000/app/${document.document}`
      );
      bringWallet = await res.data.wallet;

      console.log(bringWallet);
    } catch (err) {
      setBringUser({
        response: false,
        message: `Hubo un error con los datos del usuario: ${err}`,
      });
      console.log(err);
    }

    try {
      const newValue = parseInt(value.value, 10) + bringWallet;
      final = newValue;
      console.log(newValue);
      let res = await axios.put(`http://localhost:4000/app/updatewallet`, {
        document: document.document,
        cellphone: cellphone.cellphone,
        wallet: newValue,
      });
      final = await res.data.wallet;
      console.log(final);
      setUpdated({ response: true, message: `Su nuevo saldo es de ${final}` });
    } catch (err) {
      setUpdated({
        response: false,
        message: `Hubo un error intentando cargar su saldo: ${err}`,
      });
      console.log(err);
    }

    setCellphone({ cellphone: undefined });
    setDocument({ document: undefined });
    setValue({ value: undefined });
  };

  return (
    <div>
      <h1 className="my-5">Cargar saldo</h1>
      <form>
        <input
          ref={register({
            required: { value: true, message: "El documento  es obligatorio" },
            maxLength: {
              value: 15,
              message: "El documento no puede tener más de 15 caracteres",
            },
            minLength: {
              value: 4,
              message: "El documento debe tener como mínimo 4 caracteres",
            },
          })}
          className="me-5 mb-3"
          value={document.document}
          onChange={handleChange()}
          name="document"
          placeholder="Documento"
          type="text"
        />
        <input
          ref={register({
            required: { value: true, message: "El celular es obligatorio" },
            maxLength: {
              value: 20,
              message: "El celular no debe tener  más de 20 numeros",
            },
            minLength: {
              value: 7,
              message: "El celular debe tener como mínimo 7 numeros",
            },
          })}
          className="me-5 mb-3"
          value={cellphone.cellphone}
          onChange={handleChange()}
          name="cellphone"
          placeholder="Celular"
          type="text"
        ></input>
        <input
          ref={register({
            required: {
              value: true,
              message: "El valor a cargar es requerido",
            },
            min: { value: 0, message: "Valor no valido" },
          })}
          className="me-5 mb-3"
          value={value.value}
          onChange={handleChange()}
          name="value"
          placeholder="Valor"
          type="text"
        ></input>
        <br />
        <span className="text-danger text-small d-block mb-2">
          {errors.document && errors.document.message}
        </span>
        <span className="text-danger text-small d-block mb-2">
          {errors.cellphone && errors.cellphone.message}
        </span>
        <span className="text-danger text-small d-block mb-2">
          {errors.value && errors.value.message}
        </span>
        <br />
        {updated === "error" && (
          <span className="text-danger text-small d-block mb-2">
            Hubo un error al intentar cargar su saldo
          </span>
        )}
        {bringUser === false && (
          <span className="text-danger text-small d-block mb-2">
            {bringUser.message}
          </span>
        )}
        {updated.updated === false && (
          <span className="text-danger text-small d-block mb-2">
            {updated.message}
          </span>
        )}
        <button
          className="mt-4 btn btn-primary"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          CARGAR
        </button>
      </form>
      {updated.updated === true && <h3 className="mt-2">{updated.message}</h3>}
    </div>
  );
}

export default LoadWallet;

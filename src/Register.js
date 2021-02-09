import "./App.css";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Register() {
  const { register, errors, handleSubmit } = useForm();

  const handleChange = () => (e) => {
    e.target.name === "name"
      ? setName({ [e.target.name]: e.target.value })
      : e.target.name === "document"
      ? setDocument({ [e.target.name]: parseInt(e.target.value, 10) })
      : e.target.name === "email"
      ? setEmail({ [e.target.name]: e.target.value })
      : e.target.name === "cellphone"
      ? setCellphone({ [e.target.name]: parseInt(e.target.value, 10) })
      : console.log("error");
  };

  const [name, setName] = React.useState({
    name: "",
  });
  const [document, setDocument] = React.useState({
    document: "",
  });
  const [email, setEmail] = React.useState({
    email: "",
  });
  const [cellphone, setCellphone] = React.useState({
    cellphone: "",
  });
  const [res, setRes] = React.useState({
    res: "",
  });

  const onSubmit = (data) => {
    console.log(data);
    const register = {
      name: name.name,
      document: document.document,
      email: email.email,
      cellphone: cellphone.cellphone,
    };

    axios
      .post("http://localhost:4000/app/signup", register)
      .then((res) => {
        console.log(res.data);
        setRes({ res: `Te has registrado con exito` });
      })
      .catch((err) => {
        console.log(err.response.data);
        setRes({
          res: `Hubo un error en el registro: ${err.response.data.error.message}`,
        });
      });

    setName({ name: "" });

    setDocument({ document: "" });

    setEmail({ email: "" });

    setCellphone({ cellphone: "" });
  };

  return (
    <div>
      <h1 className="my-5">Registro</h1>
      <form>
        <input
          ref={register({
            required: { value: true, message: "El nombre es obligatorio" },
            maxLength: {
              value: 30,
              message: "No más de 30 caracteres",
            },
            minLength: {
              value: 2,
              message: "Mínimo 2 caracteres",
            },
          })}
          onChange={handleChange()}
          value={name.name}
          name="name"
          placeholder="Nombre"
          type="text"
          className="me-4 mb-3"
        ></input>

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
          name="document"
          onChange={handleChange()}
          value={document.document}
          placeholder="Documento"
          type="number"
          className="me-4 mb-3"
        />
        <input
          ref={register({
            required: { value: true, message: "El email es obligatorio" },
            maxLength: {
              value: 30,
              message: "El email no puede tener más de 30 caracteres",
            },
            minLength: {
              value: 5,
              message: "El email debe tener como mínimo 2 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Debe ser un email valido",
            },
          })}
          onChange={handleChange()}
          value={email.email}
          name="email"
          placeholder="Email"
          type="text"
          className="me-4 mb-3"
        ></input>
        <input
          ref={register({
            required: { value: true, message: "El celular es obligatorio" },
            maxLength: {
              value: 20,
              message: "No más de 20 numeros",
            },
            minLength: {
              value: 7,
              message: "Mínimo 7 numeros",
            },
          })}
          onChange={handleChange()}
          value={cellphone.cellphone}
          name="cellphone"
          placeholder="Celular"
          type="number"
          className="me-4 mb-3"
        ></input>
        <br />
        <span className="text-danger text-small d-block mb-2">
          {errors.name && errors.name.message}
        </span>
        <span className="text-danger text-small d-block mb-2">
          {errors.document && errors.document.message}
        </span>
        <span className="text-danger text-small d-block mb-2">
          {errors.email && errors.email.message}
        </span>
        <span className="text-danger text-small d-block mb-2">
          {errors.cellphone && errors.cellphone.message}
        </span>
        <button
          className="mt-4 btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Registrarse
        </button>
      </form>
      <h3 className="mt-4"> {res.res}</h3>
    </div>
  );
}

export default Register;

import "./App.css";
import React from "react";
import axios from "axios";

function Register() {
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

  const onSubmit = () => {
    console.log("working");
    const register = {
      name: name.name,
      document: document.document,
      email: email.email,
      cellphone: cellphone.cellphone,
    };
    console.log(register);

    axios
      .post("http://localhost:4000/app/signup", register)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setName({ name: "" });

    setDocument({ document: "" });

    setEmail({ email: "" });

    setCellphone({ cellphone: "" });
  };

  return (
    <div>
      <h1>Registro</h1>
      <form>
        <input
          onChange={handleChange()}
          value={name.name}
          name="name"
          placeholder="nombre"
          type="text"
        ></input>
        <input
          name="document"
          onChange={handleChange()}
          value={document.document}
          placeholder="documento"
          type="number"
        />
        <input
          onChange={handleChange()}
          value={email.email}
          name="email"
          placeholder="email"
          type="text"
        ></input>
        <input
          onChange={handleChange()}
          value={cellphone.cellphone}
          name="cellphone"
          placeholder="celular"
          type="number"
        ></input>
        <button onClick={onSubmit}>Registrarse</button>
      </form>
    </div>
  );
}

export default Register;

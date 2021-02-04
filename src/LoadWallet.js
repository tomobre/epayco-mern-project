import "./App.css";

function LoadWallet() {
  return (
    <div>
      <h1>Cargar billetera</h1>
      <form>
        <input placeholder="documento" type="text" />
        <input placeholder="celular" type="text"></input>
        <input placeholder="valor" type="text"></input>
        <button>ingresar</button>
      </form>
    </div>
  );
}

export default LoadWallet;

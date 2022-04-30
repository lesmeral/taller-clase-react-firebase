import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [items, setItems] = useState([]);
  const [id, setId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("paisaje").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setItems(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  });

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("paisaje").doc(id).delete();
      const aux = items.filter((item) => item.id !== id);
      setItems(aux);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEditar = (item) => {
    setNombre(item.nombre);
    setCiudad(item.ciudad);
    setPais(item.pais);
    setLatitud(item.latitud);
    setLongitud(item.longitud);
    setId(item.id);
  };

  const limpiar = (e) => {
    if (e) {
      e.preventDefault();
    }
    setNombre("");
    setCiudad("");
    setPais("");
    setLatitud(0);
    setLongitud(0);
    setId(null);
    setError("");
  };

  const guardarDatos = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("Campo nombre vacío");
      return;
    }

    if (!ciudad.trim()) {
      setError("Campo ciudad vacío");
      return;
    }

    if (!pais.trim()) {
      setError("Campo país vacío");
      return;
    }
    if (!`${latitud}`.trim() || latitud === 0) {
      setError("Campo latitud vacío");
      return;
    }
    if (!`${longitud}`.trim() || longitud === 0) {
      setError("Campo longitud vacío");
      return;
    }

    try {
      const db = firebase.firestore();
      const paisaje = {
        nombre,
        ciudad,
        pais,
        latitud,
        longitud,
      };
      if (id) {
        await db.collection("paisaje").doc(id).update(paisaje);
      } else {
        await db.collection("paisaje").add(paisaje);
      }
      limpiar();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container container-fluid">
      <h3>Formulario paisajes</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={(e) => guardarDatos(e)}>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <label>Ciudad</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                  <label>Pais</label>
                  <input
                    type="text"
                    className="form-control"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                  />
                  <label>Latitud</label>
                  <input
                    type="number"
                    className="form-control"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                  />
                  <label>Longitud</label>
                  <input
                    type="number"
                    className="form-control"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                  />
                </div>
                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={id ? "Editar paisaje" : "Crear paisaje"}
                />
                <button className="btn btn-success" onClick={limpiar}>
                  {id ? "Cancelar" : "Limpiar"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            {items.map((e) => (
              <li key={e.id} className="list-group-item text-center">
                <img
                  src={`https://picsum.photos/200/200?id=${e.id}`}
                  alt="imagen"
                /><br/>
                Nombre: {e.nombre}
                <br />
                Ciudad: {e.ciudad}
                <br />
                País: {e.pais}
                <br />
                Latitud: {e.latitud}
                <br />
                Longitud: {e.longitud}
                <br />
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    activarEditar(e);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    eliminar(e.id);
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Formulario;

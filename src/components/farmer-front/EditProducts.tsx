import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FormattedGranja } from "./HomePage";

function EditProducts() {
  const { id } = useParams();

  const navigate = useNavigate();

  const formatGranjaData = (data: any): FormattedGranja => {
    return {
      GranjaID: data.GranjaID || null,
      Nombre: data.Nombre || "",
      Ubicacion: data.Ubicacion || "",
      Descripcion: data.Descripcion || "",
      Rating: data.Rating || null,
      Imagen: data.Imagen || "",
      UsuarioID: data.UsuarioID || null,
      usuario: data.usuario ? JSON.parse(data.usuario) : null,
      productos: data.productos ? JSON.parse(data.productos) : [],
      practicas_sustentables: data.practicas_sustentables
        ? JSON.parse(data.practicas_sustentables)
        : null,
      badges: data.badges ? JSON.parse(data.badges) : null,
    };
  };

  const [cliente, setCliente] = useState<FormattedGranja>({
    GranjaID: null,
    Nombre: "",
    Ubicacion: "",
    Descripcion: "",
    Rating: null,
    Imagen: "",
    UsuarioID: null,
    usuario: null,
    productos: [],
    practicas_sustentables: null,
    badges: null,
  });
  const route = import.meta.env.VITE_APP_SERVER_URL || "/api";
  const handleProfileInfo = async () => {
    try {
      const response = await fetch(`${route}/myfarm/${id}`);

      const data = await response.json();

      console.log(data);

      setCliente(formatGranjaData(data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${route}/products/${id}`, {
        method: "DELETE",
      });

      console.log(response);

      if (response) {
        handleProfileInfo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProfileInfo();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [newProd, setNewProd] = useState<any>({
    Nombre: "",
    Descripcion: "",
    Imagen: "",
  });

  const handleAddProd = async () => {
    const dummy = {
      Nombre: newProd.Nombre,
      Descripcion: newProd.Descripcion,
      Imagen: newProd.Imagen,
      GranjaID: cliente.GranjaID,
    };

    try {
      const response = await fetch(`${route}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dummy),
      });

      if (response.status == 201) {
        handleProfileInfo();
        setNewProd({
          Nombre: "",
          Descripcion: "",
          Imagen: "",
        });
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-[100px] flex justify-between items-center px-6 bg-secondary-blue mb-5">
        <div
          className="rounded-full bg-main-blue flex justify-center items-center w-[200px] h-[50px] cursor-pointer select-none"
          onClick={() => navigate("/profile")}
        >
          <span className="font-sulphurPoint font-bold text-4xl text-secondary-blue">
            farmbook
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          {/* <span className="w-[40px] h-[1px] bg-black"></span>
      <span className="w-[40px] h-[1px] bg-black"></span>
      <span className="w-[40px] h-[1px] bg-black"></span> */}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mb-5 flex-col">
        <span className="w-full flex justify-start px-5">
          <FaArrowLeft
            className="hover:scale-105 tr cursor-pointer"
            onClick={() => navigate(`/profile/${id}`)}
          />
        </span>
        <div className="bg-main-blue w-[60%] flex flex-col p-5 gap-4 font-light">
          <div className="w-full flex overflow-x-auto gap-2">
            {cliente.productos?.map((item, idx) => (
              <div
                className="min-w-[200px] h-[300px] flex flex-col items-center justify-between p-5 bg-white shadow-md rounded-lg"
                key={idx}
              >
                <div className="w-full h-[60%]">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  ></div>
                </div>
                <div className="w-full h-[40%] flex flex-col gap-2 py-2">
                  <span className="font-bold">{item.name}</span>
                  <span className="font-light">{item.descripcion}</span>
                </div>

                <span className="w-full justify-center items-center flex">
                  <button
                    className="bg-red-600 py-1 px-3 rounded-md hover:bg-red-800 tr text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </button>
                </span>
              </div>
            ))}
          </div>

          <div>
            <button
              className="bg-secondary-blue py-1 px-3 rounded-sm hover:scale-105 tr"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? "Cancelar" : "Agregar"}
            </button>
          </div>

          <div>
            {isOpen ? (
              <div className="flex flex-col gap-3">
                <span className="flex gap-3 text-white items-center">
                  <span>Nombre:</span>
                  <input
                    className="text-black px-2 py-1"
                    onChange={(e) =>
                      setNewProd({ ...newProd, Nombre: e.target.value })
                    }
                    value={newProd.Nombre}
                  />
                </span>
                <span className="flex gap-3 text-white items-center">
                  <span>Descripción:</span>
                  <input
                    className="text-black px-2 py-1"
                    onChange={(e) =>
                      setNewProd({ ...newProd, Descripcion: e.target.value })
                    }
                    value={newProd.Descripcion}
                  />
                </span>
                <span className="flex gap-3 text-white items-center">
                  <span>Imagen:</span>
                  <input
                    className="text-black px-2 py-1"
                    onChange={(e) =>
                      setNewProd({ ...newProd, Imagen: e.target.value })
                    }
                    value={newProd.Imagen}
                  />
                </span>

                <span className="w-full flex justify-end items-center">
                  <button
                    className="bg-secondary-blue py-1 px-3 rounded-sm hover:scale-105 tr"
                    onClick={() => handleAddProd()}
                  >
                    Agregar
                  </button>
                </span>
              </div>
            ) : null}
          </div>
          <span className="w-full flex justify-end items-end">
            <button className="bg-green-800 text-white px-3 py-1 rounded-md hover:scale-105 tr">
              Actualizar
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditProducts;

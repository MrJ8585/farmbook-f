import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FormattedGranja } from "./HomePage";

function EditPracts() {
  const { id } = useParams();

  const [] = useState([
    "Fertilizantes naturales",
    "Irrigación por goteo",
    "Cultivos de cobertura",
    "Rotación de cultivos",
    "Paneles solares",
    "Envases biodegradables",
    "Áreas forestales",
    "Tratamiento de aguas",
    "Agricultura vertical",
    "Uso de drones",
  ]);

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

  const [_, setCliente] = useState<FormattedGranja>({
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

      setCliente(formatGranjaData(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProfileInfo();
  }, []);

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

export default EditPracts;

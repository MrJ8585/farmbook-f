import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../client-front/catalog/ProductCard";
import { farmCard } from "../client-front/catalog/FarmCard";

type Cliente = {
  id: number;
  correo: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  edad: number;
  tipo_cliente: string;
  granja_id: number;
  imagen: string;
  granja: farmCard;
};

function HomePage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    correo: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    edad: 0,
    tipo_cliente: "",
    granja_id: 0,
    imagen: "",
    granja: {
      id: 0,
      nombre: "",
      ubicacion: "",
      descripcion: "",
      rating: 0,
      imagen: "",
      productos: [],
      granja_practicas: [],
      badge_granja: [],
    },
  });

  const handleProfileInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/profile/${id}`
      );

      const data = await response.json();

      setCliente(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProfileInfo();
  }, []);

  return (
    <div className="w-full h-screen bg-secondary-blue flex flex-col">
      <div className="w-full h-[10%] flex justify-between items-center px-6">
        <div
          className="rounded-full bg-main-blue flex justify-center items-center w-[200px] h-[50px] cursor-pointer select-none"
          onClick={() => navigate("/catalog")}
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

      <div className="w-full h-[90%] overflow-y-auto flex flex-col justify-start bg-white">
        <div
          className="w-full h-[200px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://asmith.ucdavis.edu/sites/g/files/dgvnsk7811/files/styles/sf_landscape_16x9/public/media/images/frances-gunn-QcBAZ7VREHQ-unsplash.jpg?h=15bbbbfe&itok=LmdFcm_4')",
          }}
        >
          <div
            style={{ backgroundImage: `url('${cliente.imagen}')` }}
            className="h-[200px] w-[200px] rounded-full ml-10 mt-[100px] border-white border-[2px] shadow-lg bg-center bg-cover"
          ></div>
        </div>
        <div className="flex min-h-[100px] ml-[200px] pl-14 flex-col justify-center items-start">
          <span className="text-xl font-bold">{cliente.granja?.nombre}</span>

          <span className="font-light">
            {cliente.nombre} {cliente.apellido}
          </span>
          <span className="font-light text-zinc-400 text-sm">
            {cliente.correo}
          </span>
        </div>

        <div className="w-full flex flex-col gap-4 justify-center items-center pt-10">
          <div className="w-[80%] bg-white shadow-lg min-h-[400px] flex justify-between rounded-lg">
            <div className="w-[50%] h-full p-5">
              <div
                style={{ backgroundImage: `url("${cliente.granja.imagen}")` }}
                className="h-full w-full bg-cover bg-center rounded-md"
              ></div>
            </div>
            <div className="w-[50%] h-full py-5 pr-5 flex flex-col justify-between items-start">
              <span className="flex justify-between items-center w-full">
                <span className="text-3xl font-inter font-bold">
                  {cliente.granja.nombre}
                </span>

                <span>{cliente.granja.rating}/5</span>
                <span>
                  <button
                    className="flex bg-zinc-400 items-center rounded-full gap-3 px-2 hover:bg-zinc-600 tr"
                    onClick={() => {
                      navigate(`/editfarm/${cliente.granja.id}`);
                    }}
                  >
                    <span>Edit</span>
                    <MdOutlineEdit />
                  </button>
                </span>
              </span>

              <div className="flex flex-col items-start text-lg">
                <span className="text-2xl font-inter font-light w-full flex justify-start gap-5">
                  <span className="flex gap-3 items-center text-base">
                    {cliente.granja.granja_practicas?.map(
                      (prac: any, idx: number) => (
                        <span key={idx} className="relative group">
                          <img
                            src={`${prac.practicassustentables.icon}`}
                            className="h-[20px] cursor-pointer hover:scale-105 tr"
                          />

                          <span className="absolute bg-zinc-100 text-nowrap p-1 rounded-sm shadow-md hidden group-hover:flex select-none">
                            {prac.practicassustentables.nombre}
                          </span>
                        </span>
                      )
                    )}
                  </span>
                </span>

                <span className="flex flex-col gap-1 mt-4 w-full">
                  <span>Descripción: {cliente.granja.descripcion}</span>
                  <span>Ubicación: {cliente.granja.ubicacion}</span>
                </span>

                <span className="w-full">
                  {cliente.granja.productos?.map((item: any, idx: number) => (
                    <span
                      key={idx}
                      className="font-extralight text-zinc-500 text-base"
                    >
                      {" "}
                      {item.name} |
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="w-[80%] flex justify-between gap-5">
            <div className="w-full bg-white p-5 rounded-lg shadow-lg flex gap-5 cursor-pointer relative">
              <span className="absolute top-1 right-3 text-zinc-500">
                Badges
              </span>
              {cliente.granja.badge_granja?.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-green-900 rounded-full shadow-lg relative group"
                >
                  <img src={item.badge.imagen} className="h-[40px]" />

                  <span className="absolute text-nowrap bg-zinc-200 p-1 hidden group-hover:flex">
                    {item.badge.descripcion}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="w-[80%] bg-white p-5 rounded-lg shadow-lg flex gap-5 flex-wrap mb-10">
            {cliente.granja.productos?.map((item, idx) => (
              <ProductCard
                key={idx}
                image={item.image}
                name={item.name}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

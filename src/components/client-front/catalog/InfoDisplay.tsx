import { useEffect, useState } from "react";
import { FaArrowLeft, FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { farmCard } from "./FarmCard";
import ProductCard from "./ProductCard";

function InfoDisplay() {
  const [farmInfo, setFarmInfo] = useState<farmCard>({
    id: 0,
    nombre: "",
    ubicacion: "",
    descripcion: "",
    rating: 0,
    imagen: "",
    productos: [],
    granja_practicas: [],
    badge_granja: [],
  });

  const { id } = useParams();

  const getInfoById = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/farminfo/${id}`
      );

      const data = await response.json();

      console.log(data[0]);

      if (data) {
        setFarmInfo(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfoById();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-secondary-blue flex justify-start items-center flex-col">
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

      <div className="w-full h-[90%] flex justify-between items-center pb-6 flex-col">
        <span className="w-full flex justify-start px-10">
          <FaArrowLeft
            className="hover:scale-105 tr cursor-pointer"
            onClick={() => navigate(`/catalog`)}
          />
        </span>
        <div className="w-full h-full flex flex-col justify-start items-center overflow-y-auto">
          <div className="w-[80%] h-full py-5 flex flex-col justify-start items-center gap-5">
            <div className="bg-white min-h-[500px] w-full rounded-lg shadow-lg flex justify-between items-center">
              <div className="w-[50%] h-full p-5">
                <div
                  style={{ backgroundImage: `url("${farmInfo.imagen}")` }}
                  className="h-full w-full bg-cover bg-center rounded-md"
                ></div>
              </div>
              <div className="w-[50%] h-full py-5 pr-5 flex flex-col justify-between items-start">
                <span className="flex justify-between items-center w-full">
                  <span className="text-3xl font-inter font-bold">
                    {farmInfo.nombre}
                  </span>

                  <span>{farmInfo.rating}/5</span>
                </span>

                <div className="flex flex-col items-start text-lg">
                  <span className="text-2xl font-inter font-light w-full flex justify-start gap-5">
                    <span className="flex gap-3 items-center text-base">
                      {farmInfo.granja_practicas?.map(
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
                    <span>Descripción: {farmInfo.descripcion}</span>
                    <span>Ubicación: {farmInfo.ubicacion}</span>
                  </span>

                  <span className="w-full">
                    {farmInfo.productos?.map((item: any, idx: number) => (
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

            <div className="w-full flex justify-between gap-5">
              <div className="bg-white p-5 rounded-lg shadow-lg flex items-center gap-3">
                <button className="flex bg-green-700 text-green-100 items-center gap-3 px-3 py-2 rounded-full hover:scale-105 tr">
                  <IoLogoWhatsapp />
                  <span>Whatsapp</span>
                </button>

                <button className="flex bg-blue-700 text-blue-100 items-center gap-3 px-3 py-2 rounded-full hover:scale-105 tr">
                  <FaFacebook />
                  <span>Facebook</span>
                </button>
              </div>

              <div className="w-full bg-white p-5 rounded-lg shadow-lg flex gap-5 cursor-pointer relative">
                <span className="absolute top-1 right-3 text-zinc-500">
                  Badges
                </span>
                {farmInfo.badge_granja.map((item, idx) => (
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

            <div className="w-full bg-white p-5 rounded-lg shadow-lg flex gap-5 flex-wrap">
              {farmInfo.productos.map((item, idx) => (
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
    </div>
  );
}

export default InfoDisplay;

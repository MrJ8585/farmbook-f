import React from "react";

import { useNavigate } from "react-router-dom";
import { FormattedGranja } from "../Catalog";

export type farmCard = {
  id: number;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  rating: number;
  imagen: string;
  productos: {
    desc: string;
    name: string;
    image: string;
  }[];
  granja_practicas: {
    practicassustentables: {
      id: number;
      nombre: string;
      descripcion: string;
      icon: string;
    };
  }[];
  badge_granja: {
    badge: {
      id: number;
      imagen: string;
      nombre: string;
      descripcion: string;
    };
  }[];
};

const FarmCard: React.FC<FormattedGranja> = ({
  Descripcion,
  GranjaID,
  Imagen,
  Nombre,
  Rating,
  Ubicacion,

  practicas_sustentables,
  productos,
}) => {
  const navigate = useNavigate();

  console.log(practicas_sustentables);

  return (
    <div
      className="w-full min-h-[200px] bg-white rounded-md shadow-lg flex justify-start items-center hover:bg-zinc-200 cursor-pointer tr"
      onClick={() => navigate(`/catalog/${GranjaID}`)}
    >
      <div className="w-[30%] h-full p-3">
        <div
          style={{ backgroundImage: `url("${Imagen}")` }}
          className="w-full min-h-[200px] rounded-md bg-cover bg-center"
        ></div>
      </div>
      <div className="w-[70%] h-full flex flex-col justify-between py-4 px-3">
        <span className="flex justify-between items-center pr-5">
          <span className="text-2xl font-inter font-light w-full flex justify-start gap-5">
            <span>{Nombre}</span>

            <span className="flex gap-3 items-center text-base">
              {practicas_sustentables?.map((icon, idx) => (
                <span key={idx} className="relative group">
                  <img
                    src={`${icon.icon}`}
                    className="h-[20px] cursor-pointer hover:scale-105 tr"
                  />

                  <span className="absolute bg-zinc-100 text-nowrap p-1 rounded-sm shadow-md hidden group-hover:flex select-none">
                    {icon.descripcion}
                  </span>
                </span>
              ))}
            </span>
          </span>

          <span>{Rating}/5</span>
        </span>

        <span className="flex flex-col gap-1 mt-4 w-full">
          <span>Descripción: {Descripcion}</span>
          <span>Ubicación: {Ubicacion}</span>
        </span>

        <span className="w-full">
          {productos.map((item, idx) => (
            <span key={idx} className="font-extralight text-zinc-500 text-sm">
              {" "}
              {item.name} |
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default FarmCard;

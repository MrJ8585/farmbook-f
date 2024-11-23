import React from "react";
import { IconType } from "react-icons";

type practices = {
  name: string;
  icon: IconType;
};

export type farmCard = {
  name: string;
  description: string;
  location: string;
  mainProducts: Array<string>;
  sustainablePractices: Array<practices>;
  image: string;
};

const FarmCard: React.FC<farmCard> = ({
  image,
  name,
  description,
  location,
  mainProducts,
  sustainablePractices,
}) => {
  return (
    <div className="w-full h-[200px] bg-white rounded-md shadow-lg flex justify-start items-center">
      <div className="w-[30%] h-full p-3">
        <div
          style={{ backgroundImage: `url("${image}")` }}
          className="w-full h-full rounded-md bg-cover bg-center"
        ></div>
      </div>
      <div className="w-[70%] h-full flex flex-col justify-between py-4 pl-3">
        <span className="text-2xl font-inter font-light w-full flex justify-start gap-5">
          <span>{name}</span>

          <span className="flex gap-3 items-center text-base">
            {sustainablePractices.map((icon, idx) => (
              <span key={idx} className="relative group">
                <icon.icon className="hover:scale-105 tr cursor-pointer" />

                <span className="absolute bg-zinc-100 text-nowrap p-1 rounded-sm shadow-md hidden group-hover:flex select-none">
                  {icon.name}
                </span>
              </span>
            ))}
          </span>
        </span>

        <span className="flex flex-col gap-1 mt-4 w-full">
          <span>Descripción: {description}</span>
          <span>Ubicación: {location}</span>
        </span>

        <span className="w-full">
          {mainProducts.map((item, idx) => (
            <span key={idx} className="font-extralight text-zinc-500 text-sm">
              {" "}
              {item} |
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default FarmCard;
